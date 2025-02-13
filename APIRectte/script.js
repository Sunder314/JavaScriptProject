$(document).ready(function() {
    const $searchInput = $("#search");
    const $resultsContainer = $("#results");
    const $ingredientSelect = $("#ingredientSelect");
    const $categorySelect = $("#categorySelect");
    const $areaSelect = $("#areaSelect");

    initializeSelects();

    $("#searchButton").on("click", function() {
        const query = $searchInput.val().trim();
        if (query) {
            fetchRecipesByName(query);
        }
    });

    $("#randomButton").on("click", fetchRandomRecipe);

    $("#ingredientButton").on("click", function() {
        const ingredient = $ingredientSelect.val();
        if (ingredient) {
            fetchRecipesByIngredient(ingredient);
        }
    });

    $("#categoryButton").on("click", function() {
        const category = $categorySelect.val();
        if (category) {
            fetchRecipesByCategory(category);
        }
    });

    $("#areaButton").on("click", function() {
        const area = $areaSelect.val();
        if (area) {
            fetchRecipesByArea(area);
        }
    });

    function initializeSelects() {
        $.when(
            $.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list'),
            $.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
            $.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        ).then(function(ingredientsData, categoriesData, areasData) {
            // Ingredients
            ingredientsData[0].meals.forEach(function(ingredient) {
                $ingredientSelect.append(
                    $('<option>', {
                        value: ingredient.strIngredient,
                        text: ingredient.strIngredient
                    })
                );
            });

            // Categories
            categoriesData[0].meals.forEach(function(category) {
                $categorySelect.append(
                    $('<option>', {
                        value: category.strCategory,
                        text: category.strCategory
                    })
                );
            });

            // Areas
            areasData[0].meals.forEach(function(area) {
                $areaSelect.append(
                    $('<option>', {
                        value: area.strArea,
                        text: area.strArea
                    })
                );
            });
        }).fail(function(error) {
            console.error('Erreur lors de l\'initialisation des listes:', error);
        });
    }

    function fetchRecipesByName(name) {
        $.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .done(function(data) {
                displayMeals(data.meals);
            })
            .fail(function(error) {
                console.error('Erreur lors de la recherche par nom:', error);
            });
    }

    function fetchRandomRecipe() {
        $.get("https://www.themealdb.com/api/json/v1/1/random.php")
            .done(function(data) {
                displayMeals(data.meals);
            })
            .fail(function(error) {
                console.error('Erreur lors de la recherche aléatoire:', error);
            });
    }

    function fetchRecipesByIngredient(ingredient) {
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .done(function(data) {
                displayMeals(data.meals);
            })
            .fail(function(error) {
                console.error('Erreur lors de la recherche par ingrédient:', error);
            });
    }

    function fetchRecipesByCategory(category) {
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .done(function(data) {
                displayMeals(data.meals);
            })
            .fail(function(error) {
                console.error('Erreur lors de la recherche par catégorie:', error);
            });
    }

    function fetchRecipesByArea(area) {
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            .done(function(data) {
                displayMeals(data.meals);
            })
            .fail(function(error) {
                console.error('Erreur lors de la recherche par pays:', error);
            });
    }

    function displayMeals(meals) {
        $resultsContainer.empty();
        
        if (!meals) {
            $resultsContainer.html("<p class='col-12 text-center'>Aucune recette trouvée.</p>");
            return;
        }

        meals.forEach(function(meal) {
            const $mealCard = $('<div>', {
                class: 'col-md-4 meal-card'
            }).append(
                $('<div>', {
                    class: 'card shadow-sm'
                }).append(
                    $('<img>', {
                        class: 'card-img-top',
                        src: meal.strMealThumb,
                        alt: meal.strMeal
                    }),
                    $('<div>', {
                        class: 'card-body'
                    }).append(
                        $('<h5>', {
                            class: 'card-title',
                            text: meal.strMeal
                        }),
                        $('<button>', {
                            class: 'btn btn-primary w-100',
                            text: 'Voir la recette',
                            click: function() {
                                getMealDetails(meal.idMeal);
                            }
                        })
                    )
                )
            );
            
            $resultsContainer.append($mealCard);
        });
    }

    function getMealDetails(id) {
        $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .done(function(data) {
                const meal = data.meals[0];
                let ingredients = [];
                
                for (let i = 1; i <= 20; i++) {
                    if (meal[`strIngredient${i}`]) {
                        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                    }
                }

                const $modal = $(`
                    <div class="modal fade" id="recipeModal" tabindex="-1">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">${meal.strMeal}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
                                    <h6>Ingrédients:</h6>
                                    <ul>
                                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                    </ul>
                                    <h6>Instructions:</h6>
                                    <p>${meal.strInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                $('#recipeModal').remove();
                $('body').append($modal);
                
                const modal = new bootstrap.Modal('#recipeModal');
                modal.show();
            })
            .fail(function(error) {
                console.error('Erreur lors de la récupération des détails:', error);
            });
    }
});

