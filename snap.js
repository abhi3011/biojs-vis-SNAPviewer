//various variables

           
var diameter = 30;                  //diameter of the residue circle
var a = diameter;                   //variables a and b are used in calculating the coordinates of all residues
var b= diameter;
var x=50;                           //starting coordinates for the function that calculates the centre of all residues
var y=50;
var x_cord=[];                      //empty arrays to contain the coordinates of the residues
var y_cord=[];
var count = 0;
var residue_num = 450;              //number of maximum residues
var zoom_help;                      //copy of the elemEnter which is used to assign the zoom functionality


// tool tip initialization

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .attr("x",500)
    .style("opacity", 0);







                                    




//initializing zoom behaviour

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);









// calculating coordintes of the residue circles and pushing them in the empty array x_cord and y_cord.
//the number of residues in one horizontal line is taken to be 29 and one residue is used to join
//two horizontal lines

while(count<=residue_num){
  for(i=1;i<=30;i++){
    if(i<=28)
      {x=x+a
      x_cord.push(x);
      y_cord.push(y);
      count=count+1;}
   if(i==29)
      {x_cord.push(x);
      y=y+b;
      y_cord.push(y);
      count=count+1;}
   if(i==30)
      {x_cord.push(x);
       y=y+30;
      y_cord.push(y) ; 
      a=(-a);}
  }
}

//function to pick colour for residues, red for mutated and green for neutral



function colourPick(d){

  if (d.mut[0].type== "non-neutral")
    {return "red"}
  if (d.mut[0].type=="neutral")
    {return "yellow"}
  else
    {return "lightblue"}

}




//svg container for circles and text

var svgcontainer = d3.select("body").append("svg") 
                                    .attr("width", 950)
                                    .attr("height",2000)
                                    .call(zoom);

//reading the json file which contain the residues

d3.json("data.json",function(json){

    var elem = svgcontainer.selectAll("div")
                  .data(json.residues);

    var elemEnter = elem.enter()
        .append("g")
        .on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", .9) 
                .style("left", (d3.event.pageX) +7)     
                .style("top", (d3.event.pageY)+7)   
                .text(info(d));
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });

    



    // saving the elemEnter as zoom_help for the zoomed function  
   
    zoom_help = elemEnter;  
    var circle = elemEnter.append("circle")
                          .attr("cx",function(d){return x_cord[d.inde];})
                          .attr("cy",function(d){return y_cord[d.inde];})
                          .attr("r",15)
                          .style("fill",function(d){return colourPick(d)});
                          
    
    elemEnter.append("text")
             .attr("id","text")
             .attr("dy", function(d){return y_cord[d.inde]+5;})
             .attr("dx",function(d){ return x_cord[d.inde]-4;})
             .attr("text-align","center")
             .text(function(d){return d.name});
             
 }) ;






//zoom function
function zoomed() {
  zoom_help.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}




//information on the tool tip

var info = function(d){return (d.mut[0].what+" "+" "+d.mut[0].type)};