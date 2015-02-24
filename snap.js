

           
var diameter = 30;
var a = diameter;
var b= diameter;
var x=50;
var y=50;
var x_cord=[];
var y_cord=[];
var count = 0;
var residue_num = 300;




var new_svgcontainer=d3.select("body")
                         .append("svg")
                         .attr("height",150)
                         .attr("width",950);
var info_field = new_svgcontainer
                 .append("g");

var info_box= info_field.append("rect")
                      .attr("x",225)
                      .attr("y",0)
                      .attr("height",225)
                      .attr("width",500)
                      .style("fill","#ccff00");

var info_text = info_field.append("text");                      
var info_text_mutation = info_field.append("text");
                                    
                                    




//scg container for circles and text

var svgcontainer = d3.select("body").append("svg") 
                                    .attr("width", 950)
                                    .attr("height",2000);





//table of information of the top

function mutation_table(k){
  
  return(k.mut[0].what+"--------------------------->"+k.mut[0].type)
    
}






// calculating coordintes of the residue circles and pushing them in the empty array x_cord and y_cord

while(count<+residue_num){
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

//function to pick specific colour for specific residues

function colourPick(i){ 

  if (i=='A')
      return "#00cc00";
  if(i=='R')
      return "#e5e4e2";
  if(i=='N')
      return "#98afc7";
  if(i=='D')
      return "#0041c2";
  if(i=='C')
      return "#3bb9ff";
  if(i=='E')
      return "#728c00";
  if(i=='Q')
      return "#00ff00";
  if(i=='G')
      return "#ffff00";
  if(i=='H')
      return "#cd7f32";
  if(i=='I')
      return "#ff8040";
  if(i=='L')
      return "#f75d59";
  if(i=='K')
      return "#7d0552";
  if(i=='M')
      return "#c48189";
  if(i=='F')
      return "#f3e5ab";
  if(i=='P')
      return "#347c17";
  if(i=='S')
      return "#57feff";
  if(i=='T')
      return "#c9be62";
  if(i=='W')
      return "#ffe87c";
  if(i=='Y')
      return "#ffebcd";
  if(i=='V')
      return "#3bb900";
}

//


//drawing section


d3.json("data.json",function(json){

    var elem = svgcontainer.selectAll("div")
                  .data(json.residues);

    var elemEnter = elem.enter()
        .append("g")
        .on("click",function(d){
                            zoom_num= 1;
                            return zoom(d);
                            });

    var circle = elemEnter.append("circle")
                          .attr("cx",function(d){return x_cord[d.inde];})
                          .attr("cy",function(d){return y_cord[d.inde];})
                          .attr("r",15)
                          .style("fill",function(d){return colourPick(d.name)});
                          

    elemEnter.append("text")
             .attr("dy", function(d){return y_cord[d.inde]+5;})
             .attr("dx",function(d){ return x_cord[d.inde]-5;})
             .text(function(d){return d.name});
             
 }) ;



function zoom(d){
  
   
  var k = d; 
  console.log(x_cord[0]);
  var t = svgcontainer.selectAll("g")
                    /*  .selectAll("circle")
                      .attr("cx",(475-x_cord[k.inde]))
                      .attr("cy",(475-y_cord[k.inde]));*/
                     


                      .transition()
                      .duration(750)
                      .attr("transform", function(d){return "translate(" + (475-x_cord[k.inde]) + "," + (100-y_cord[k.inde]) + ")";});

 
                   
 
                      

var give_info_name= info_text
               .attr("dx",250)
               .attr("dy",20)
               .text("RESIDUE:"+k.name+"........................................................................"+"POSITION:"+(k.inde+1));

var give_mutation  =  info_text_mutation 
                         .attr("dx",260)
                         .attr("dy",50) 
                         .text(mutation_table(k)); 



}