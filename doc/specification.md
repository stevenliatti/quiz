# Spécifications

## Règles de fonctionnement du site

### Participation

Un quiz commence à l'instant t. L'utilisateur peut commencer à répondre (démarrer) au quiz jusqu'à l'instant u (défini par le créateur).

La structure des questions est la suivante : pour une question, il y aura 4 réponses possibles et une seule bonne réponse.

Une limite maximale de temps par question est définie. Cependant, une limite minimale et maximale seront définies par défaut (par exemple: min = 3 sec, max = 60 sec).

Chaque question peut avoir un temps maximum différent.

L'utilisateur est obligé de répondre à la question pour pouvoir continuer.
Si l'utilisateur n'a pas répondu à la question avant la fin du temps imparti la réponse est considérée comme fausse et il passe automatiquement à la question suivante.

Lorsqu'il répond à la question, on lui indique s'il a correctement répondu et on passe à la question suivante.

L'utilisateur ne peut pas revenir en arrière.

Il peut voir son score en tout temps et son avancement dans le questionnaire.

Un système de coefficient multiplicateur par bonne réponse est présent. Au fur et à mesure que l'utilisateur répond juste aux questions, un coeffcient augmente jusqu'à une réponse fausse qui remet ce coefficient bonus à 0.

Un questionnaire ne peut pas être refait.

À la fin du quiz, on obtient un résumé de notre participation (bonnes/mauvaises réponses, score) et une note et des commentaires peuvent être donnés.

Un système de ranking des quiz et créateurs de quiz.

### Création

N'importe quel utilisateur peut créer un quiz, mais il ne peut pas participer à ses propres quiz.

L'utilisateur choisi le nom, la description, le thème, le nombre de questions et les réponses possibles.

Les utilisateurs pourraient signaler les quiz à contenu inapproprié. Si un certain nombre de clients signalent le quiz, une notification est envoyée aux administrateurs.

### Recherche d'un quiz

Les joueurs peuvent chercher les quiz par créateur, thème (tags).


## Fonctions et services

- Inscription
- Connexion
- Créer un quiz
- Éditer un quiz
- Supprimer un quiz (définir dans quelles conditions)
- Participer à un quiz
- Consulter le classement des joueurs

## Intervenants et préciser leurs rôles, droits, restrictions, etc.

Administrateur

Utilisateur

## Commencer le maquettage des interfaces avec l’outil Balsamiq
