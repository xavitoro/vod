
$(function() {
  var addNewIngredient = $('#ingredientList');
  var i = $('#ingredientList li').size() + 1;
  //TO-DO update the placeholder i when an item is removed (part1) >>> Same for the Steps!!!
  // function updatePlaceholders() {
  //   var pLength = $('#addRecipeIngredient p').size();
  //   console.log(pLength);
  //   var j = 2;
  //   if (j <= pLength) {
  //     $('input').each(function() {
  //       $('#p_new_qty').attr("placeholder","Hola" + j);
  //       $('#p_new_ingredient').attr("placeholder","Que tal" + j);
  //       j++;
  //     });
  //   }
  // }

  $('#addNewIngredient').live('click', function() {
    //TO-DO update the placeholder i when an item is removed (part2)
    // $('<p><input type="text" id="p_new_qty" value="" placeholder="Quantity Ingredient '+ i +'" /><input type="text" id="p_new_ingredient" placeholder="Ingredient '+ i +'" /><a href="#" id="removeNewIngredient">Remove Ingredient</a> </p>').appendTo(addDiv);
    $('<li><input type="text" name="p_new_qty" placeholder="Quantity ingredient (e.g. 2)" /><input type="text" name="p_new_qty_unit" placeholder="Quantity unit (e.g. slice)" /><input type="text" name="p_new_ingredient" placeholder="Ingredient (e.g. bread)" /><a href="#" id="removeNewIngredient">Remove Ingredient</a></li>').appendTo(addNewIngredient);
    i++;

    return false;
  });

  $('#removeNewIngredient').live('click', function() {
    if( i > 2 ) {
      $(this).parents('li').remove();
      i--;
      //TO-DO update the placeholder i when an item is removed (part3)
      // updatePlaceholders();
    }
    return false;
  });




});
