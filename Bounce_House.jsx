/*
 Bounce House version 1.0
  © Cory Livengood 05/19/13
 Created by Cory Livengood
 
 Using the ever-so-famous "Inertial Bounce" expression found at www.graymachine.com and described as a "community effort" originally envisioned by Dan Ebberts and changed over time.
 Lots of love and appreciation to Scott Heath (www.gscottheath.com) for assistance.
*/
    
    
    
    var proj = app.project; // The Application Object is at the top level followed by the Project Object.
    var comp = proj.activeItem;  // Set the comp variable to the active composition.

if(comp.selectedLayers.length > 0) {
    app.beginUndoGroup("Bounce House");
    for(var k = 0; k < comp.selectedLayers.length; k++){
    var layer = comp.selectedLayers[k]; // Set the layer variable to the selected layer of the composition object.
    if(layer.selectedProperties.length > 0) {
        for(var i = 0; i < layer.selectedProperties.length; i++) {
            var parameter = layer.selectedProperties[i];
            
            /*
            //Determine if there are keyframes on the selected property and add one at the current time if there are none present.
                var numKeys = parameter.numKeys; // Get the number of keyframes on the selected property through the numKeys attribute.                
                if (numKeys > 0) {
                expressionCreator (i);
            } else {
                    var curTime = app.project.activeItem.time; //get the current time.
                    parameter.addKey(curTime);// add a key to the current time.
                }*/
            
bounceHouse(i);
            }
    } else {
        alert("Make sure you've selected all desired layer properties, not just the layers themselves.");
        }
    }
     app.endUndoGroup();
} else {
    alert("Make sure you've selected all desired layer properties.");
}
        
    //function to add a slider control and expression to the selected property.
    function bounceHouse(index){
        var myExpr = "n = 0; \
if (numKeys > 0){ \
  n = nearestKey(time).index; \
  if (key(n).time > time) n--; \
} \
if (n > 0){ \
  try{ \
    t = time - key(n).time; \
    v = velocityAtTime(key(n).time - thisComp.frameDuration/10); \
    amp = effect(\"Amp "+index+"\")(\"Slider\")/100; \
    freq = effect(\"Freq "+index+"\")(\"Slider\"); \
    decay = effect(\"Decay "+index+"\")(\"Slider\"); \
    value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t); \
  }catch (err){ \
    value; \
  } \
}else \
  value;";
        var addSlider1 = layer.Effects.addProperty("ADBE Slider Control");
        addSlider1(1).setValue(5);
        addSlider1.name = 'Amp '+index;
        var addSlider2= layer.Effects.addProperty("ADBE Slider Control");
        addSlider2(1).setValue(3);
        addSlider2.name = 'Freq '+index;
        var addSlider3 = layer.Effects.addProperty("ADBE Slider Control");
        addSlider3(1).setValue(4);
        addSlider3.name = 'Decay '+index;
        parameter.expression = myExpr;
    }
