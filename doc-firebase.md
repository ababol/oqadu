Doc Firebase
=========

#### Pour la gestion de file d'attente dans notre projet nous avions de multiples besoins :

1. Partager les données du client avec le vendeur
2. Avoir une file d'attente ordonnée de clients pour chacuns des rayons
3. Donner accès à toute la file d'attente au vendeur
4. Pouvoir notifier en temps réel le client de sa position dans la file d'attente
5. Afficher en temps réel au vendeur quels sont les clients qui ne sont pas encore pris en charge

### Qu'est-ce que Firebase :

1. C'est un Serveur et base de données.
2. Les données sont stockées dans le cloud (un espace de stockage qui nous est dédié).
3. Firebase permet de synchroniser les données en temps réel.
4. On peut avoir voir - creer - modifier - supprimer des données manuellement via l'interface web (http://oqadu.firebaseio.com).
5. Firebase s'intègre très bien avec Angular.JS et donc ionic.

> C'est donc parceque Firebase correspondait en tous points à notre besoin que nous l'avons utilisé pour notre projet. Cela nous a permit de ne pas avoir à "réinventer la roue".

### Firebase dans oqadu :

> Nous stockons dans Firebase un tableau d'utilisateurs par rayon, ce qui correspond à la file d'attente de chaque rayon.

#### Un utilisateur :

Chaque utilisateur est modélisé par un objet comprennant :
- Les questions dont il a répondu avec ses réponses.
- Les produits qui lui ont été recommandés.
- Son panier d'achat.
- Les tags qui lui sont décernés.
- Potentiellement le vendeur qui l'a pris en charge (si cela a été le cas). 

#### Les tableaux de Firebase :

##### La connexion :

Pour se connecter, il faut préciser à quelle tableau de firebase on veut se synchroniser dans l'url : 
```js
var ref = new Firebase("https://oqadu.firebaseio.com/" + queue + "/queue");
var sync = $firebase(ref);
```
Puis il suffit de récuperer le tableau de firebase :
```js
$scope.syncQueue = sync.$asArray();
```
Alors `$scope.syncQueue` est un tableau JavaScript comprennant toute la file d'attente du rayon en question.
Ce tableau est toujours à jour, à chaques fois qu'un nouveau utilisateur arrive dans la file d'attente le tableau va se mettre à jour dans toutes les applications automatiquement !


##### Create - Read - Update - Delete dans Firebase :
###### Ajouter un objet "utilisateur" :
Il suffit d'utiliser la methode `$add` pour ajouter un objet dans le tableau et le sychroniser avec firebase :
```js
$scope.syncQueue.$add($scope.user).then(function(ref){
  console.log("ref new user : " + ref);
});
```
###### La lecture d'objet "utilisateur" :
Etant donnée que cela se comporte comme un tableau JavaScript classique il suffit de faire `$scope.syncQueue[index]` pour lire les informations d'un utilisateur.
###### Modifier un objet "utilisateur" :
On peut modifier un objet utilisateur comme avec un tableau JavaScript classique, mais pour que la modification se propage partout il faut appeler la methode `$save` ensuite : 
```js
$scope.syncQueue.[index].seller = $scope.seller;
$scope.syncQueue.$save(index);
```
###### Supprimer un objet "utilisateur" :
Pour supprimer un objet utilisateur du tableau et propager cette modification partout il faut utiliser la methode `$remove` de firebase.

```js
$scope.syncQueue.$remove(index).then(function(){  
  console.log("user removed");
});
```

##### Les évenements :

Firebase apporte en plus de la synchronisation des données une methode qui est assez utiles car elle permet d'écouter des évenements sur le tableau. C'est la méthode `$watch` qui prend en argument une callback : 
```js
  $scope.syncQueue.$watch(function(e){
    if(e.event == "child_changed")
      refreshProducts();
  });
```
Les évenemements peuvent être : 
- TODO


### Créer une alternative à Firebase :

