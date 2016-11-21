$(function() {
  var addNewStep = $('#stepList');
  var i = $('#stepList li').size() + 1;
  // var stepsIndex = 2;

  $('#addNewStep').live('click', function() {
    $('<li><h4>Step </h4><input type="text" name="p_new_step_picture" value="" class="form-group col-md-12" placeholder="Picture URL" /><input type="text" name="p_new_step_description" class="form-group col-md-12" placeholder="Description" /><input type="text" name="p_new_step_tips" class="form-group col-md-12" placeholder="Tip" /><a href="#" id="removeNewStep">Remove Step</a></li>').appendTo(addNewStep);
    i++;
    // stepsIndex++;

    return false;
  });

  $('#removeNewStep').live('click', function() {
    if( i > 2 ) {
      $(this).parent().remove();
      i--;
    }
    return false;
  });

});
