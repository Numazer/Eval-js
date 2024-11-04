let listeTache = document.getElementById('listeTache');

// Fonction pour créer une tâche
function createTache() {
    let creerTache = document.getElementById('creerTache');
    let creerTacheDesc = document.getElementById('creerTacheDesc');
    let creerTacheDate = document.getElementById('creerTacheDate');

    let textTache = creerTache.value.trim();
    let descTache = creerTacheDesc.value.trim();
    let dateTache = creerTacheDate.value;

    if (textTache === "") {
        return; // Ne fait rien si le champ est vide
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <strong>Tâche :</strong> <span class="taskText">${textTache}</span> <br>
        <strong>Description :</strong> <span class="taskDesc">${descTache}</span> <br>
        <strong>Date :</strong> <span class="taskDate">${dateTache}</span>
    `;

    // Bouton d'édition
    let boutonEdit = createEditButton(li);
    li.appendChild(boutonEdit);

    // Bouton de suppression
    let boutonSuppr = createDeleteButton(li);
    li.appendChild(boutonSuppr);
      
    // Bouton de marquage comme terminée
    let boutonTerminer = createCompleteButton(li);
    li.appendChild(boutonTerminer);

    listeTache.appendChild(li);

    // Effacer les champs d'entrée
    creerTache.value = "";
    creerTacheDesc.value = "";
    creerTacheDate.value = "";
}

// Fonction pour créer un bouton d'édition
function createEditButton(tache) {
    let boutonEdit = document.createElement("button");
    boutonEdit.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    boutonEdit.onclick = function() {
        editTache(tache);
    };
    return boutonEdit;
}

// Fonction pour créer un bouton de suppression
function createDeleteButton(tache) {
    let boutonSuppr = document.createElement("button");
    boutonSuppr.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    boutonSuppr.onclick = function() {
        supprTache(tache);
    };
    return boutonSuppr;
}

// Fonction pour supprimer une tâche
function supprTache(tache) {
    listeTache.removeChild(tache);
    console.log("Tâche supprimée"); // Pour vérifier que ça fonctionne
}

// Fonction pour créer un bouton de marquage comme terminé
function createCompleteButton(tache) {
    let boutonTerminer = document.createElement("button");
    boutonTerminer.innerHTML = '<ion-icon name="checkmark-circle-outline" class="complete"></ion-icon>';
    boutonTerminer.onclick = function() {
        completeTache(tache);
    };
    return boutonTerminer;
}

// Fonction pour marquer une tâche comme terminée
function completeTache(tache) {
    let taskText = tache.querySelector(".taskText");
    let taskDesc = tache.querySelector(".taskDesc");
    let taskDate = tache.querySelector(".taskDate");

    // Vérifier si la tâche est déjà terminée
    if (tache.classList.contains('completed')) {
        // Si elle est déjà terminée, retirer le message et la classe
        tache.classList.remove('completed');
        let message = tache.querySelector('.statusMessage');
        if (message) {
            tache.removeChild(message); // Retirer le message de statut
        }
    } else {
        // Si elle n'est pas encore terminée, ajouter la classe et le message
        tache.classList.add('completed');
        let message = document.createElement('span');
        message.className = 'statusMessage';
        message.innerText = ' (Terminée)';
        tache.appendChild(message); // Ajouter le message de statut
    }
}

// Fonction pour éditer une tâche
function editTache(tache) {
    let taskText = tache.querySelector(".taskText");
    let taskDesc = tache.querySelector(".taskDesc");
    let taskDate = tache.querySelector(".taskDate");

    // Créer des champs d'entrée pour la tâche
    let inputText = document.createElement("input");
    inputText.value = taskText.innerText;

    let inputDesc = document.createElement("input");
    inputDesc.value = taskDesc.innerText;

    let inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.value = taskDate.innerText;

    // Vider le contenu de la tâche
    tache.innerHTML = "";
    tache.appendChild(inputText);
    tache.appendChild(document.createElement("br"));
    tache.appendChild(inputDesc);
    tache.appendChild(document.createElement("br"));
    tache.appendChild(inputDate);


    // Créer un bouton de sauvegarde
    let boutonSave = document.createElement("button");
    boutonSave.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';

    boutonSave.onclick = function() {
        // Validation et mise à jour des éléments de texte
        if (inputText.value.trim()) {
            // Mettre à jour le texte de la tâche
            taskText.innerText = inputText.value;
            taskDesc.innerText = inputDesc.value;
            taskDate.innerText = inputDate.value;

            // Réinitialiser l'élément de tâche pour afficher le texte
            tache.innerHTML = "";
            tache.appendChild(taskText);
            tache.appendChild(document.createElement("br"));
            tache.appendChild(taskDesc);
            tache.appendChild(document.createElement("br"));
            tache.appendChild(taskDate);

            // Réinsérer les boutons d'édition et de suppression
            tache.appendChild(createEditButton(tache));
            tache.appendChild(createDeleteButton(tache));
            tache.appendChild(createCompleteButton(tache));
        } else {
            alert("Le champ de la tâche ne peut pas être vide.");
        }
    };

    tache.appendChild(boutonSave);
}

function sortTasks() {
    const tasksArray = Array.from(listeTache.children);
    
    tasksArray.sort((a, b) => {
        const dateA = new Date(a.querySelector('.taskDate').innerText);
        const dateB = new Date(b.querySelector('.taskDate').innerText);
        return dateB - dateA; // Tri décroissant (le plus récent en premier)
    });

    // Vider la liste actuelle et réinsérer les tâches triées
    listeTache.innerHTML = '';
    tasksArray.forEach(task => listeTache.appendChild(task));
}

function filterTasks() {
    const filterDate = document.getElementById('filterDate').value;
    const filterCompleted = document.getElementById('filterCompleted').checked;
    const tasks = listeTache.getElementsByTagName('li');

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskDate = task.querySelector('.taskDate').innerText;
        const isCompleted = task.classList.contains('completed');

        const dateMatch = !filterDate || taskDate === filterDate;
        const completedMatch = !filterCompleted || isCompleted;

        if (dateMatch && completedMatch) {
            task.style.display = ''; // Affiche la tâche
        } else {
            task.style.display = 'none'; // Masque la tâche
        }
    }

    // Appel à la fonction de tri après le filtrage
    sortTasks();
}

