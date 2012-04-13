// @todo TIDY TIDY TIDY
(function($) {
    
    /**** Add supporting span to textarea & text inputs *****/
    
    $.fn.replaceFormText = function() {
    
    	return this.each(function() {
    	
    		var textReplacing = $(this);
    		var textReplacingClass = (textReplacing.attr('class') ? textReplacing.attr('class'): '');
	   			
	   			textReplacing.wrap('<div class="ctext ' + textReplacingClass + '" />')
	   						 .after('<span />')
	   						 .bind('click', function(){
	   						 
	   						 	$(this).parents('form')
	   						   		   .find('ul')
	   						   		   .slideUp('fast');
	   						 
	   						 }).attr('autocomplete','off');
	   			    	
    	});
    
    }
    
    /**** Add hidden UL for select and do the stuff *****/
    
    $.fn.replaceFormSelects = function() {
  
    	return this.each(function() {
    	
    		var selectReplacing = $(this);
    			if(selectReplacing.hasClass('hidden')){
    				return;
    			}
    		var selectReplacingClass = (selectReplacing.attr('class') ? selectReplacing.attr('class'): '');
	   		var selectReplacingText = (selectReplacing.find('option:selected').length > 0 ? selectReplacing.find('option:selected').html() : selectReplacing.find('option:first').html());
	   		var selectReplacingValue = (selectReplacing.find('option:selected').length > 0 ? selectReplacing.find('option:selected').val() : selectReplacing.find('option:first').val());
	   			   		
	   			selectReplacing.wrap('<div class="cselect ' + selectReplacingClass + '" />')
	   						   .before('<span class="open" data-value="' + selectReplacingValue + '">' + selectReplacingText + '</span><ul></ul>');
	   						   
	   			selectReplacing.hide('fast')
	   						    .find('option')
	   						    .each(function(){
                                    var selectReplacingOption = $(this);
	   								selectReplacing.parent()
	   											   .find('ul')
	   											   .append('<li data-value="' + selectReplacingOption.val()  + '">' + selectReplacingOption.html() + '</li>')
	   											   .css('display', 'none');	
	   			
	   							});
		
	   			selectReplacing.parent()
	   						   .find('.open')
	   						   .bind('click', function(e){
	   						   		
	   						   		$(this).parents('form')
	   						   			   .find('ul')
	   						   			   .slideUp('fast');
	   						   		
	   						   		if($(this).next('ul:visible').length == 0){	   
	   						   			
	   						   			 $(this).next('ul')
	   						   			   		.slideDown('fast')
	   						   			   		.children('li')
	   						   			   		.bind('click', function(){
	   						   			   		
	   						   			   				var clickedText = $(this).html();
	   						   			   				var clickedVal = $(this).data('value');
	   						   			   				var thisContainer = $(this).parent().parent();
	   						   			   					
                                                        thisContainer
                                                            .find('select')
                                                            .find('option:selected')
                                                            .attr('selected', false)
                                                            .end()
                                                            .find('option[value="' + clickedVal + '"]')
                                                            .attr('selected', 'selected')
	   						   			   				  	   						   			   				   
                                                        thisContainer
                                                            .find('ul')
                                                            .slideUp('fast')
                                                            .end()
                                                            .find('.open')
                                                            .html(clickedText)
                                                            .data('value', clickedVal);
	   						   			   				
	   						   			   		});
	   						   			   		
	   						   		}
	   						   
	   						   }).end()
	   						   .parent()
	   						   .bind('mouseleave', function(){
	   						   		
	   						   		$(this).find('ul').slideUp('fast');
	   						   
	   						   });
   	
    	});
    
    }
    
    /**** Add hidden UL for select and do the stuff *****/
    
    $.fn.replaceFormRadios = function() {
  
    	return this.each(function() {
   
    		var radioReplacing = $(this);
    		var radioReplacingClass = (radioReplacing.attr('class') ? radioReplacing.attr('class'): '');
	   		var radioReplacingText = radioReplacing.next().html();
	   		var radioReplacingName = radioReplacing.attr('name');
	   		var radioReplacingChecked = (radioReplacing.attr('checked') == 'checked' ? ' checked' : '');
	   		
	   		    radioReplacing.wrap('<div class="cradio ' + radioReplacingClass + '" />')
	   						  .before('<span class="select' + radioReplacingChecked + '">' + radioReplacingText + '</span>');
	   						   	   
	   			radioReplacing.hide('fast')
	   						  .parent()
	   						  .find('.select')
	   						  .bind('click', function(){
	   						  
	   						  	$(this).parents('form')
	   						  		   .find('input:radio:checked')
	   						  		   .attr('checked', false)
	   						  		   .parent()
	   						  		   .find('span')
	   						  		   .removeClass('checked');
	   						  		   
	   						  	$(this).parent()
	   						  		   .find('input')
	   						  		   .attr('checked', 'checked');
	   						  		   
	   						  		   
	   						  	$(this).addClass('checked');
	   						  	
	   						  
	   						  })
	   						  .end()
	   						  .parent()
	   						  .children('span')
	   						  .hide('fast');
	   							
	   	 });		    
    }
    
    $.fn.replaceFormChecks = function() {
  
    	return this.each(function() {
   
    		var checkReplacing = $(this);
            var checkReplacingLabel = checkReplacing.prev().prev();
            	if(!checkReplacingLabel.length){
            		checkReplacingLabel = checkReplacing.prev();
            	} 
    		var checkReplacingClass = (checkReplacing.attr('class') ? checkReplacing.attr('class'): '');
	   		var checkReplacingText = checkReplacingLabel.html();
	   		var checkReplacingName = checkReplacing.attr('name');
	   		var checkReplacingChecked = (checkReplacing.attr('checked') == 'checked' ? ' checked' : '');  
	   		    checkReplacing.wrap('<div class="ccheck ' + checkReplacingClass + '" />')
	   						  .before('<span class="check' + checkReplacingChecked + '">' + checkReplacingText + '</span>');
	   						   	   
	   			checkReplacing.hide('fast')
	   						  .parent()
	   						  .find('.check')
	   						  .bind('click', function(){
	   						  	
	   						  	if($(this).hasClass('checked')){
	   						  	
	   						  	$(this).parent()
	   						  		   .find('span')
	   						  		   .removeClass('checked');
	   						  		   
	   						  		   return;
								}
	   						  		
	   						  		$(this).parent()
	   						  		   	.find('input')
	   						  		   	.attr('checked', 'checked');
   
	   						  		$(this).addClass('checked');
	   						  	
	   						  	
	   						  })
	   						  .end()
	   						  .parents('.inline')
	   						  .children('span')
	   						  .hide('fast');
	   							
                checkReplacingLabel.hide('fast');
	   							
	   	 });		    
    }

    
    /**** What's been submitted *****/
    
    $.fn.formReplace = function() {
				
    	return this.each(function() {
        
        	var thisForm = $(this);
        		
        		thisForm.addClass('replaced');
   
        		thisForm.find('input:text, input:password').replaceFormText();
        		thisForm.find('select').replaceFormSelects();
        		thisForm.find('input:radio').replaceFormRadios();
        		thisForm.find('input:checkbox').replaceFormChecks();

        
        });
    
    }
    
})(jQuery);