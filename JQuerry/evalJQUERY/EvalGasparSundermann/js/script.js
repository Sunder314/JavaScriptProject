// script.js - Partie 1 : Configuration et Utilitaires
const BASE_URL = 'https://pixe.la/v1';

// Fonction utilitaire pour afficher les messages
function message(message, type) {
    $('#message')
        .removeClass()
        .addClass(type)
        .text(message)
        .show()
        .delay(3000)
        .fadeOut();
}

// Fonction pour stocker les ids
function Identifiants(username, token) {
    localStorage.setItem('pixela_username', username);
    localStorage.setItem('pixela_token', token);
}

// Fonction pour récupérer les ids
function getIdentifiants() {
    return {
        username: localStorage.getItem('pixela_username'),
        token: localStorage.getItem('pixela_token')
    };
}

// gestion de la navbar
$(document).ready(function() {
    
    $(".tab-content").hide(); 
    $(".tab-content.active").show(); 

    
    $("#userTab").click(function() {
        $(".tab-content").removeClass("active").hide(); 
        $("#user").addClass("active").show(); 
    });

    $("#graphTab").click(function() {
        $(".tab-content").removeClass("active").hide();
        $("#graph").addClass("active").show();
    });

    $("#pixelTab").click(function() {
        $(".tab-content").removeClass("active").hide();
        $("#pixel").addClass("active").show();
    });

    $("#webhookTab").click(function() {
        $(".tab-content").removeClass("active").hide();
        $("#webhook").addClass("active").show();
    });
});


//Gestion des Utilisateurs
// Création d'un utilisateur
$('#createUserForm').submit(function(e) {
    e.preventDefault();
    const username = $('#username').val();
    const token = $('#token').val();

    $.ajax({
        url: `${BASE_URL}/users`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            token: token,
            username: username,
            agreeTermsOfService: 'yes',
            notMinor: 'yes'
        }),
        success: function(response) {
            message('Bravo, User a bien été ajouté', 'success');
            Identifiants(username, token);
            verfiauth();
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Mise à jour d'un utilisateur
$('#updateUserForm').submit(function(e) {
    e.preventDefault();
    const username = $('#updateUsername').val();
    const newToken = $('#updateToken').val();
    const currentToken = $('#currentToken').val();

    $.ajax({
        url: `${BASE_URL}/users/${username}`,
        method: 'PUT',
        headers: {
            'X-USER-TOKEN': currentToken
        },
        contentType: 'application/json',
        data: JSON.stringify({
            newToken: newToken
        }),
        success: function() {
            message('l user a bien été ajouté', 'success');
            Identifiants(username, newToken);
            verfiauth();
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Suppression d'un utilisateur
$('#deleteUserForm').submit(function(e) {
    e.preventDefault();
    const username = $('#deleteUsername').val();
    const token = $('#deleteToken').val();

    $.ajax({
        url: `${BASE_URL}/users/${username}`,
        method: 'DELETE',
        headers: {
            'X-USER-TOKEN': token
        },
        success: function() {
            message('User suppr', 'success');
            localStorage.removeItem('pixela_username');
            localStorage.removeItem('pixela_token');
            verfiauth();
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Gestion de l'authentification
function verfiauth() {
    const ids = getIdentifiants();
    if (ids.username && ids.token) {
        $('#loginSection').hide();
        $('#loggedInSection').show();
        $('#currentUser').text(`Connecté :  ${ids.username}`);
        $('.requires-auth').show();
        listeGraph(); // Charger les graphiques après connexion
    } else {
        $('#loginSection').show();
        $('#loggedInSection').hide();
        $('.requires-auth').hide();
    }
}

// Login
$('#loginForm').submit(function(e) {
    e.preventDefault();
    const username = $('#loginUsername').val();
    const token = $('#loginToken').val();

    // Vérifier les ids avec l'API
    $.ajax({
        url: `${BASE_URL}/users/${username}/graphs`,
        method: 'GET',
        headers: {
            'X-USER-TOKEN': token
        },
        success: function() {
            Identifiants(username, token);
            message('Connexion à bien été reussite ', 'success');
            verfiauth();
        },
        error: function() {
            message('Identifiants incorrects', 'error');
        }
    });
});

// Logout
$('#logoutBtn').click(function() {
    localStorage.removeItem('pixela_username');
    localStorage.removeItem('pixela_token');
    message('Déconnexion réussie', 'success');
    verfiauth();
});

// Gestion des Graphiques
// Création d'un graphique
$('#createGraphForm').submit(function(e) {
    e.preventDefault();
    const ids = getIdentifiants();
    const graphId = $('#graphId').val();
    const name = $('#graphName').val();
    const type = $('#graphType').val();
    
    
    
    // Convertir la couleur HTML en une des couleurs acceptées par Pixela
    const colorInput = $('#graphColor').val();
    let pixelaColor;
    console.log(colorInput);
    
    // Conversion simple de la couleur HTML en couleur Pixela
    switch(colorInput.toLowerCase()) {
        case '#00ff00':
        case '#008000':
            pixelaColor = 'shibafu'; // vert
            break;
        case '#ff0000':
        case '#800000':
            pixelaColor = 'momiji';  // rouge
            break;
        case '#0000ff':
        case '#000080':
            pixelaColor = 'sora';    // bleu
            break;
        case '#ffff00':
        case '#808000':
            pixelaColor = 'ichou';   // jaune
            break;
        case '#800080':
        case '#ff00ff':
            pixelaColor = 'ajisai';  // violet
            break;
        default:
            pixelaColor = 'kuro';    // noir
    }

    // Validation des données
    if (graphId.length > 16) {
        message("L'ID du graphique doit faire moins de 16 caractères", 'error');
        return;
    }

    if (!/^[a-z0-9-]+$/.test(graphId)) {
        message("L'ID ne doit contenir que des lettres minuscules, des chiffres ou des tirets", 'error');
        return;
    }

    if (name.length > 200) {
        message("Le nom doit faire moins de 200 caractères", 'error');
        return;
    }

    console.log({ids, graphId,name,type,pixelaColor});
    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/graphs`,
        method: 'POST',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        contentType: 'application/json',
        data: JSON.stringify({
            "id":graphId,
            "name": name,
            "unit":"commit",
            "type":type,
            "color":pixelaColor,
        }),
        success: function() {
            message('Graphique créé avec succès !', 'success');
            listeGraph();
        },
        error: function(xhr) {
            message('Erreur : ' + (xhr.responseJSON ? xhr.responseJSON.message : 'Erreur inconnue'), 'error');
        }
    });

    
});

// Chargement de la liste des graphiques
function listeGraph() {
    const ids = getIdentifiants();
    if (!ids.username || !ids.token) return;

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/graphs`,
        method: 'GET',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        success: function(response) {
            const graphList = $('#graphList');
            graphList.empty();
            
            response.graphs.forEach(function(graph) {
                const graphElement = $(`
                    <div class="graph-item">
                        <h3>${graph.name}</h3>
                        <p>ID: ${graph.id}</p>
                        <p>Unité: ${graph.unit}</p>
                        <img src="${BASE_URL}/users/${ids.username}/graphs/${graph.id}" alt="Graph">
                        <button class="delete-graph" data-id="${graph.id}">Supprimer</button>
                    </div>
                `);
                graphList.append(graphElement);
            });
        },
        error: function(xhr) {
            message('Erreur de chargement des graphiques', 'error');
        }
    });
}

// Supprimer un graphique
function deleteGraph(graphId) {
    const ids = getIdentifiants();
    if (!ids.username || !ids.token) return;

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/graphs/${graphId}`,
        method: 'DELETE',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        success: function(response) {
            // Afficher un message de succès
            message('Graphique supprimé avec succès', 'success');
            
            // Recharger la liste des graphiques
            listeGraph();
        },
        error: function(xhr) {
            // Afficher un message d'erreur si la suppression échoue
            message('Erreur lors de la suppression du graphique', 'error');
        }
    });
}

// Attacher l'événement de suppression au bouton
$(document).on('click', '.delete-graph', function() {
    const graphId = $(this).data('id');
    deleteGraph(graphId);
});


// Gestion des Pixels
// Ajout d'un pixel
$('#postPixelForm').submit(function(e) {
    e.preventDefault();
    const ids = getIdentifiants();
    const graphId = $('#pixelGraphId').val();
    const date = $('#pixelDate').val().replace(/-/g, '');
    const quantity = $('#pixelQuantity').val();

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/graphs/${graphId}`,
        method: 'POST',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        contentType: 'application/json',
        data: JSON.stringify({
            date: date,
            quantity: quantity
        }),
        success: function() {
            message('Pixel ajouté avec succès !', 'success');
            listeGraph(); // Rafraîchir les graphiques
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Suppression d'un pixel
$('#deletePixelForm').submit(function(e) {
    e.preventDefault();
    
    const ids = getIdentifiants();
    const graphId = $('#deletePixelGraphId').val();
    const date = $('#deletePixelDate').val().replace(/-/g, ''); // La date est formatée (AAAAMMJJ)
    
    // Vérifier si les champs sont valides
    if (!graphId || !date) {
        message('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Effectuer la suppression
    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/graphs/${graphId}/${date}`,
        method: 'DELETE',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        success: function(response) {
            message('Pixel supprimé ', 'success');
            listeGraph(); // Rafraîchir les graphiques
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});



// Gestion des Webhooks 
// Création d'un webhook
$('#createWebhookForm').submit(function(e) {
    e.preventDefault();
    const ids = getIdentifiants();
    const graphId = $('#webhookGraphId').val();
    const type = $('#webhookType').val();

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/webhooks`,
        method: 'POST',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        contentType: 'application/json',
        data: JSON.stringify({
            graphID: graphId,
            type: type
        }),
        success: function(response) {
            message('Webhook à bien été crée', 'success');
            listeWebhooks(); // Charger la liste des webhooks
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Charger les webhooks
function listeWebhooks() {
    const ids = getIdentifiants();
    if (!ids.username || !ids.token) return;

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/webhooks`,
        method: 'GET',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        success: function(response) {
            const webhookList = $('#webhookList');
            webhookList.empty();
            
            response.webhooks.forEach(function(webhook) {
                const webhookElement = $(`
                    <div class="webhook-item">
                        <p>Hash: ${webhook.webhookHash}</p>
                        <p>GraphID: ${webhook.graphID}</p>
                        <p>Type: ${webhook.type}</p>
                        <button class="delete-webhook" data-hash="${webhook.webhookHash}">Supprimer</button>
                    </div>
                `);
                webhookList.append(webhookElement);
            });
        },
        error: function(xhr) {
            message('Erreur de chargement des webhooks', 'error');
        }
    });
}

// Supprimer un webhook
$(document).on('click', '.delete-webhook', function() {
    const ids = getIdentifiants();
    const webhookHash = $(this).data('hash');

    $.ajax({
        url: `${BASE_URL}/users/${ids.username}/webhooks/${webhookHash}`,
        method: 'DELETE',
        headers: {
            'X-USER-TOKEN': ids.token
        },
        success: function() {
            message('Webhook supprimé ', 'success');
            listeWebhooks();
        },
        error: function(xhr) {
            message('Erreur : ' + xhr.responseJSON.message, 'error');
        }
    });
});

// Initialiser l'application
$(document).ready(function() {
    verfiauth();
});