//Objectif 1: Quand on clique sur un des buttons remove, ca supprime tout l'article de la ligne


//Or il y a pleins de button remove, donc on va accéder à tous puis

//1) On cible tous les buttons remove
var allRemoveButtons= document.getElementsByClassName('btn-danger');

//2) On crée une for loop qui va cibler chacun des bouttons
for(var i=0; i<allRemoveButtons.length; i++) {
  var button = allRemoveButtons[i];
  //puis on crée le addEventListener avec une callback function=event listener qui contient l'event
  //le parametre de la callbackfunction cible tous les buttons de button.addEventListener
  //e.target access all these buttons we want to react
  button.addEventListener('click', removeArticle );
  //On appelle la function updateTotal qu'on va écrire après pour tout mettre à jour quand on supprime l'article
 
}
//event listener pour créer raccourci dans addEventListener
function removeArticle(e) {
  e.target.parentElement.parentElement.remove(); //obligé d'y accéder de cette manière car on est le bouton targeted
  updateTotal()
}
  
  


//Objectif 2: 
//Faire en sorte que price se multiplie à la quantity quelqu'elle soit puis mettre à jour le total
//quand on va cliquer il ne devrait etre pris en considération que les lignes restantes

function updateTotal() {
  //on accède au 1er cart-items de la page, car même s'il n'y en a qu'1, il le cible avec getElementsByClassName, donc obligé de définir le quel. Il aurait pu faire querySelector
  var itemsContainer = document.querySelector('.cart-items');

  //puis on accède à tous les row/item de ce container
  var cartRows = itemsContainer.getElementsByClassName('cart-row');
  //On veut maintenant pouvoir accéder à toutes les rows ciblées
  
  //On initialise une variable total=0, qui contiendra price*quantity
  var total=0;

  //On va donc utiliser une for loop pour tourner dans larray de getElementsByclassName('cart-row')
  for(var i=0; i<cartRows.length;i++){

    var theRow= cartRows[i];
    //puis on veut accéder au prix et à la quantité de chaque Row
    //D'abord on cible tous les cart-price puis on cible le 1er element qui l'a 
    //ainsi on cible le 1er price de j ème row
    var priceRow= theRow.getElementsByClassName('cart-price')[0];
    //On cible le 1er class cart-quantity du Row[i]
    var quantityRow= theRow.getElementsByClassName('cart-quantity-input')[0];
    //Maintenant on a accédé au contenu de chaque row et donc au prix et à la quantité
    //Pour le prix: enlever le $ et les transformer en number pour pouvoir effectuer des opérations
    var price = parseFloat(priceRow.innerText.replace('$', ''));
    //Pour la quantité: c'est un input, donc on veut sa value
    var quantity= quantityRow.value;
    //on met à jour la variable total avec les nouvelles valeurs qu'on a rendue en nombre
    total += price*quantity;

    total=Math.round(total*100)/100; //on arrondi le total ) 2 décimal si prix avec virgule
    
    //Enfin: on veut que le total obtenu soit écrit dans la case total de notre page web
    //!: Il faut rentrer dans le contenu de l'élement avec .innerText
    //!: Ne pas oublier d'ajouter le signe $: car on a tout transformer en nombre, donc il n'apparaitrait pas automatiquement
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+ total;
  }
    
    
}

//comme updateTotal() est appelé dans addEventListener qui remove l'article quand on clique; le total se mettra à jour quand on va remove un article

//Objectif 3: Mettre à jour le total quand on change la quantity des objets

//1) On accède à tous les quantity input elements
var quantityInput= document.getElementsByClassName('cart-quantity-input');

//2) On veut acceder aux inputs elements 1 par 1; donc on va loop inside them, puis créer l'event dans la loop pour chaque input changer
for(var i=0; i<quantityInput.length; i++) {
  var inputElement= quantityInput[i];
  //On va créer un event ou quand le input change, le total se met à jour
  inputElement.addEventListener('change', realTotal )
}

//le addEventListener veut dire que quand on change l'input ca appel la function realTotal, qui appelle la function updateTotal() qui fait total=price*quantity
//plus ajouit avant ca de la condition que si quantity value not a number ou <=0 alors quantity value =1


function realTotal(e) {
  //The target of the event, will be the input Element that we need
  //so we do:
  var input = e.target; //l) chaque var input == 1 input du html
  //Mais comme l'utilisateur peut écrire ce qu'il veut, il faut que ce qu'il écrit soit un nombre donc on fait:
  //Et on veut que ce soit un nombre positif
  if (isNaN(input.value) || input.value <=0) {
    input.value = 1;
  }
  //là on appelle la function qu'on a dejà créee qui est updateTotal()
  updateTotal()
}

//4ème étape: activer le bouton add to cart

var addCart= document.getElementsByClassName('shop-item-button');

for(var i=0; i<addCart.length; i++) {
  var buttonAdd= addCart[i];
  
  buttonAdd.addEventListener('click', addToCart);
}

function addToCart(e) {
  var buttonAdd= e.target;
  //là on va mettre les élements à add dans le cart quand on clique sur Add Cart
  //we need the price, name and image from the item, because quantity will always be 1 minimum and remoove button will always be there
  var shopItem = buttonAdd.parentElement.parentElement; //obligé car on accède par le target
  var title= shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price= shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc= shopItem.getElementsByClassName('shop-item-image')[0].src;

  //Quand on appelera cette fonction elle accèdera à tous ces elements
  //Maintenant, il faut les ajouter au cart
  //pour cela il faut créer une nouvelle function qui va les ajouter
  //On va la créer à l'exterieur et l'appeler ici

  addItemToCart(title, price, imageSrc)
  updateTotal(); //so When i add something to cart, the total will be updated
  
}

//là on crée la function addItemToCart qui va ajouter les items au cart
//on va lui mettre 3parametres qui avec les noms précedents

function addItemToCart(title, price, imageSrc) {
  //1) We need to create a row for the cart item we add
  //Autrement dit, on veut créer un <div> qui va contenir les infos de notre item
  var cartRow= document.createElement('div');
  //Mais pour add toute la ligne il faut faire
  cartRow.classList.add('cart-row');

  //Ici on va ajouter un conditional statement, pour que: si luser ajoute 1 autre fois le même item
  //le site pop une alert qui l'averti qu'il a déjà cliqué + ça sort complètement de la function addItemCart pour ne pas l'inclure dans le cart

  //1)On accède au nom de l'item: en entrant d'abord dans la row item
  var cartItems= document.getElementsByClassName('cart-items')[0]; //on le met mais il n'y en a qu'1, donc bonne pratique au cas ou on en rajoute plutard
//puis on accède au nom de l'item
  var titleItem= cartItems.getElementsByClassName('cart-item-title');
//Puis on crée une for loop pour pouvoir accéder à chacun des nom d'items
  for (var i=0; i<titleItem.length; i++) {
    if(titleItem[i].innerText==title) { //!!! NE PAS OUBLIER LE .innerText DANS LA CONDITION, POUR ACCEDER AU CONTENU DE LELEMENT ET DONC AU TITLE: SINON 9A NE MARCHERA PAS
      alert("you've already selected this item");
      return //on met que return pour pouvoir sortir de la fonction juste après l'alerte et que l'item qui a été selectionné une 2ème fois ne se rajoute pas dans le cart
    }
  }

  //Now that we've created this <div>, it won't appear in our html yet
  // We have to nest it with .appenChild() in the parent element that we want
  //The parentElement <div class="cart-items"> that nest all the rows with items added
  var cartItems=document.getElementsByClassName('cart-items')[0]; //we want the first <div class="cart-items"> il n'y en a qu'un mais c'est une bonen pratique vu qu'on utilise getElementsByClassName
  //Append our cartRow to the end of our cart items, but for now it'll just add an empty <div>
  //if we wanted to add a full div, we had to do: cartRow.innerTex= title; par ex et ca aurait ajouter le tire de l'item; mais il faudrait ajouter un style

  //so now we add an empty <div>, but we want to add all the row infos that we select by clicking addtocart
  //to do so:
  //on copie colle le HTML de chaque cart-item dans le cart-row pour avoir même leur style
  var cartRowContent = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;

cartRow.innerHTML= cartRowContent;
cartItems.append(cartRow);
//So now the content is added to the cart

//But now we need to add an eventlistener, so that the newly created remove buttons of the new items, work
//Because the item and remove button are created after the page is loaded, that's why we need that
//On va donc entrer dans le cartRow crée puis accéder à chaque bouton remove
let newRemoveButton = cartRow.getElementsByClassName('btn-danger')[0];
newRemoveButton.addEventListener('click', removeArticle ); //=Quand on clique sur le bouton remove ca active la fonction remove article qu'on a crée précedemment
//Ainsi, les newly created remove buttons marcheront aussi

//Et on fait la même chose pour faire fonctionner els nouvelles quantité crées
let newQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
newQuantity.addEventListener('change', realTotal)

//et là on peut ajouter à notre variable cartRow avec le creatElement('div'); tout cela
//On va utiliser innerHTML au lieu de InnerText, car il y a des balises HTML

//Mais si on s'arrête là, quelque soit l'article sur lequel on cliquera sur addtocart, ça mettra tout le temps le t-shirt avec son prix
//!!!!!! Et c'est là que les paramètres de la fonction vont servir vont servir !!!!!!!!
//Comme on a utiliser `` les strings literals, on peut utiliser les interpolation cad ${} et y ajouter ce qu'on veut
// Dans ce cas, on va mettre les paramètres à l'interieure des strings litterals
//Ainsi, quand on cliquera sur addtocart, ca va ajouter les infos relatives au bouton cliqué
//!!!!Et dans la donction au-dessus on a accéder à chaque element et on leur a donner les même noms que les paramètres
//!!!Donc la valeur des paramètres sera l'accès à ces élements
//donc ${imgSrc} a pour valeur:   var imageSrc= shopItem.getElementsByClassName('shop-item-image')[0].src; de la function au-dessus qui appelle cette function addItemToCart()

//Mais là on a un problème: quand je clique plusieurs fois sur addToCart d'un item, ça le rajoute plusieurs fois
//Or ce n'est aps ce qu'on veut vu qu'il y a une quantité faite pour ça
//!!!!!!!!!!!Alors on va rajouter au debut du code un conditional statement pour check que s'il est déjà, il ne se rajoute pas

//!!!After adding the conditional statement, i noticed that the newly created remove button does not work and the total is not being updated 
//!!!That's because they are created after the page is loaded
//!!!So i need to access them here and add event listener to them, AT THE END OF THIS FUNCTION


}

//Maintenant que j'ai utilisé les 2 items préselectionné dans le html pour l'exemple;
//je peux les supprimer de mon document HTML
//Et même si les différentes classes n'existent plus, ça marchera quand même
//Je pense donc que ça pouvait etre fait encore plus simplement


//La dernière etape: est de faire en sorte que quand on clique sur le PURCHASE button, ça supprime tous les articles selectionnés du cart

//on accède au bouton purchase
var purchaseButton = document.querySelector('.btn-purchase');

//Là on va add un event listener pour que quand on clique sur le bouton ça retire tous les articles
purchaseButton.addEventListener('click', removeAllItems);

//Là on crée l'event listener pour n'écrire que le raccourci plus haut dans addEventListener
function removeAllItems () {
  //Quand il cliquera sur le bouton, ce message apparaitra en 1er
  alert('Thank you for your Purchase');
  //Puis on accède le container de tous les items/rows. Il n'y en a que 1 dans le html et c'est celui vec la class="cart-items"
  var cartItems= document.getElementsByClassName('cart-items')[0];
  //on va utiliser juste une while loop au lieu d'une for loop, car on n'a pas besoin d'increment operator et on veu tque ça se repete tant que la condition est vraie
  //Là on veut loop sur tous les children = cart rows; inside of the cart
  while(cartItems.hasChildNodes()) { //= S'Il y a des children dans ce cart item / si oui alors
    cartItems.removeChild(cartItems.firstChild); //Supprime le children trouvée / loop jusqu'à ce qu'il n'y ait plus de children
  }
  updateTotal(); //pour update le total une fois que tout les items ont ete removed
}

//Possible de faire plus facilement dans ce cas, sans while lopp et avec querySlector car seulement 1 element dans le HTML
//function removeAllItems () {
  //alert('Thank you for your Purchase');
  //var cartItems= document.querySelector('.cart-items'); Car que 1 item
  //cartItems.remove(); car on veut que ça remove tout
  //updateTotal(); pour emttre le total à 0 une fois tout remove
//}










