# Spécification

## Introduction

L'ensemble des points est à compléter.

## Analyse

Dans cette partie d'analyse sera regroupé les exigences du projet ainsi que l'analyse des risques.

### Définition des rôles

 **Anonyme**

- Inscription
- Connexion
- Visualiser les quizz disponibles

  **Utilisateur**

- Créer un quiz
- S'inscrire à un quizz
- Rejoindre un quizz (post inscription)
- Visualiser le classement

### Définition des besoins (exigences)

#### Exigences du projet

- Définir des règles

- Les rôles des utilisateurs

- Réalisation d'un client Web et Mobile

- Déploiement Cloud

- Effectuer une montée en charge

- Mettre en place des tests de performance

#### Exigences fonctionnelles

##### Les fonctions et les services offerts par le logiciel

1. Sign In
2. Login
3. Logout
4. Création d'un quizz
5. Inscription à un ou plusieurs quizz
6. Participer à un quizz

  #### Exigences non fonctionnelles

1. Création d'un quizz
   1. Limiter la durée du quizz
   2. Limiter la durée des questions
   3. Nommé un quizz

### Analyse des risques

- En fonction des propriétés du projet
  - Taille du projet
  - Difficultés techniques
  - Degré d'intégration

 **Adapter selon nos besoins**

| Risques / Degré du risque | 0    | 1    | 2    | 3    | 4    | 5    |
| ------------------------- | ---- | ---- | ---- | ---- | ---- | ---- |
| Taille du projet          |      |      |      |      |      |      |
| Difficultés techniques    |      |      |      |      |      |      |
| Degré d'intégration       |      |      |      |      |      |      |

## Modélisation

### Modèles

### Diagrammes d’activités

#### Login

```flow
login=>start: Accès à la page de login
form=>operation: Complétion du formulaire
cond=>condition: Identifiant corrects ?
valid=>end: Connecté
login->form
form->cond(no)->form
form->cond(yes)->valid
```



### Maquettes



## Conception

### Architecture

### Interfaces

### Persistances et gestion des données
