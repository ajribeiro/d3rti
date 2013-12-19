$(function(){ 
    $( "#slider" ).slider({
        range: true,
        min: 0,
        max: data.length-1,
        values: [0,data.length-1],
        slide: function( event, ui ) {
        var maxv = d3.min([ui.values[1], data.length]);
        var minv = d3.max([ui.values[0], 0]);;

        x.domain([minv, maxv-1]);
        graph.transition().duration(750)
            .select(".x.axis").call(xAxis);
        graph.transition().duration(750)
            .select(".path").attr("d", line(data));
    }});
});

function draw_scl_control(){

    var left = xmargin+width+30

    var svg = d3.select('#rtiplot')

    var r1 = svg.append('g')
        .attr('class','nav')
        .style('cursor','pointer')

    r1.append('rect')
        .attr('x',left)
        .attr('y',50)
        .attr('height',20)
        .attr('width',20)
        .style('fill','black')
        .style('stroke','none')

    r1.append('line')
        .attr('x1',left)
        .attr('y1',60)
        .attr('x2',left+20)
        .attr('y2',60)
        .attr('class','arr')

    r1.append('line')
        .attr('x1',left+10)
        .attr('y1',50)
        .attr('x2',left+10)
        .attr('y2',50+20)
        .attr('class','arr')

    r1.on('click',function(){
        if(ptype == 'v') sclmax += 100
        else if(ptype == 'w_l') sclmax += 30
        else sclmax += 5

        d3.selectAll('.cbar').remove()
        d3.selectAll('.cbarlabel').remove()
        update_cols()
        draw_colorbar()
        label_colorbar()
    })

    var r1 = svg.append('g')
        .attr('class','nav')
        .style('cursor','pointer')

    r1.append('rect')
        .attr('x',left)
        .attr('y',375)
        .attr('height',20)
        .attr('width',20)
        .style('fill','black')
        .style('stroke','none')

    r1.append('line')
        .attr('x1',left)
        .attr('y1',375)
        .attr('x2',left+20)
        .attr('y2',375)
        .attr('class','arr')

    r1.on('click',function(){
        if(ptype == 'v') sclmax -= 100
        else if(ptype == 'w_l') sclmax -= 30
        else sclmax -= 5

        d3.selectAll('.cbar').remove()
        d3.selectAll('.cbarlabel').remove()
        update_cols()
        draw_colorbar()
        label_colorbar()
    })
}

function get_color(val){
    col = null
    if(ptype != 'v'){
        inc = sclmax/7
        for(var i=0; i<6; i++)
            if(val < (i+1)*inc) return colscl[i]
        return colscl[6]
    }
    else{
        inc = sclmax/3.
        for(i=-3; i<4; i++)
            if(val < i*inc) return velcol[i+3]
        return velcol[7]
    }
}

function set_tooltips(x,y){
    svg = d3.select('#rtiplot')
    d3.selectAll(".cell")
        .on('mouseover',function(d,i){
            var id = d['time'].toString().replace(/ /g,'')+d.r.toString()
            id = id.replace(/:/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'')

            d3.select('#'+id).transition()
                .duration(10)
                .style('stroke','yellow')
                .style('fill','yellow')


            var g = svg.append('g')
                    .attr("id", 'n'+id)

            var ibox = g.append('rect')
                .attr('class','infobox')
                .attr("x",function(a,b){
                    return x(d['time'])-75;
                })
                .attr("y",function(a) {
                    return y(d.r)-95;
                })
                .attr('width',400)
                .attr('height',75)
                .style('fill','black')

            g.append('text')
                .text(function(){
                    return d['time'].toString().slice(0,24)+' Range Gate: '+d.r
                })
                .attr('class','infotext')
                .attr('x',function(){
                    return x(d['time'])+125;
                })
                .attr('y',function(){
                    return y(d.r)-65;
                })

            g.append('text')
                .text(function(){
                    return 'vel: '+Math.round(d.v).toString()+' m/s'+
                            ' wid: '+Math.round(d.w_l).toString()+' m/s'+
                            ' pow: '+Math.round(d.p_l).toString()+' dB'
                })
                .attr('class','infotext')
                .attr('x',function(){
                    return x(d['time'])+125;
                })
                .attr('y',function(){
                    return y(d.r)-40;
                })
        })
        .on("mouseout", function(d){
            var id = d['time'].toString().replace(/ /g,'')+d.r.toString()
            id = id.replace(/:/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'')

            d3.select('#'+id).transition()
                .duration(10)
                .style('stroke',function(){
                    if(ptype == 'v') return get_color(d.v)
                    else if(ptype == 'w_l') return get_color(d.w_l)
                    else return get_color(d.p_l)
                })
                .style('fill',function(){
                    if(ptype == 'v') return get_color(d.v)
                    else if(ptype == 'w_l') return get_color(d.w_l)
                    else return get_color(d.p_l)
                })

            d3.select("#n" + id)
                .remove();
        });
}

function draw_axis(x,y){

    var svg = d3.select('#rtiplot')
    time_axis = d3.svg.axis()
        .scale(x)
        .tickFormat(d3.time.format("%H:%M"))
        .orient('bottom')

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(time_axis)
        
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2+xmargin)
        .attr("y", height+45)
        .text("UT");

    range_axis = d3.svg.axis()
        .scale(y)
        .orient("left");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + xmargin + ",0)")
        .call(range_axis);

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "left")
        .attr("y", height/2)
        .attr('x',5)
        .attr("dy", ".75em")
        .text("Range Gate");

    svg.append('rect')
        .attr('x',xmargin)
        .attr('y',50)
        .attr('height',height-50)
        .attr('width',width)
        .style('fill','none')
        .style('stroke','white')
        .style('stroke-width',2)
}

function init_data(){

    var cells = d3.select('#rtiplot')
        .selectAll('rect.cell')
        .data(tempdata[beams.indexOf(bmnum)])
        .enter()
        .append('rect')
        .attr('class','cell')
        .attr('id',function(d){
            var id = d['time'].toString().replace(/ /g,'')+d.r.toString()
            id = id.replace(/:/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'')
            return id
        })
        .attr('x', function(d){ return x(d['time']) })
        .attr('y', function(d){ return y(d.r)-(y(0)-y(1)) })
        .attr('width',function(d){
            var ind = times.indexOf(d['time'])+1
            if(ind < times.length) return (x(times[ind])-x(d['time']))
            else return 1
        })
        .attr('height',function(d){
            return y(0)-y(1)
        })
        .style('stroke',function(d){
            if(ptype == 'v') return get_color(d.v)
            else if(ptype == 'w_l') return get_color(d.w_l)
            else return get_color(d.p_l)
        })
        .style('fill',function(d){
            if(ptype == 'v') return get_color(d.v)
            else if(ptype == 'w_l') return get_color(d.w_l)
            else return get_color(d.p_l)
        })
}

function draw_colorbar(){
    var bot = ymargin+height-240
    var left = xmargin+width+30
    var wid = 20, hei = 30
    var svg = d3.select('#rtiplot')

    if(ptype == 'v'){
        for(var i=0; i<8; i++){
            svg.append('rect')
                .attr('class','cbar')
                .attr('x',left)
                .attr('y',function(){ return bot-i*hei })
                .attr('height',hei)
                .attr('width',wid)
                .style('fill',velcol[i])
        }
    }
    else{
        for(var i=0; i<7; i++){
            svg.append('rect')
                .attr('class','cbar')
                .attr('x',left)
                .attr('y',function(){ return bot-i*hei })
                .attr('height',hei)
                .attr('width',wid)
                .style('fill',colscl[i])
        }
    }
}

function label_colorbar(){
    var bot = ymargin+height-240
    var left = xmargin+width+55
    var svg = d3.select('#rtiplot')
    var hei = 30
    if(ptype == 'v'){
        var inc = sclmax / 3.

        for(var i=-3; i<4; i++){
            svg.append('text')
                .attr('class','cbarlabel')
                .attr('x',left)
                .attr('y',function(){ return bot-(i+3)*hei+3 })
                .text(Math.round(i*inc).toString())
        }
    }
    else{
        var inc = sclmax / 7.
        for(var i=0; i<7; i++){
            svg.append('text')
                .attr('class','cbarlabel')
                .attr('x',left)
                .attr('y',function(){ return bot-(i-1)*hei+3 })
                .text(Math.round(i*inc).toString())
        }
    }
    var scl = null, title = null, yloc = null
    if(ptype == 'v'){
        scl = 'm/s'
        title = 'Vel'
        yloc = 90
    }
    else {
        yloc = 120
        if(ptype == 'w_l'){
            title = 'Wid'
            scl = 'm/s'
        }
        else{
            title = 'Pow'
            scl = 'dB'
        }
    }

    svg.append('text')
        .text(title)
        .attr('x',left-15)
        .attr('y',yloc)
        .style('text-anchor','middle')
        .attr('class','cbarlabel')

    svg.append('text')
        .text('['+scl+']')
        .attr('x',left-15)
        .attr('y',bot+50)
        .attr('class','cbarlabel')
        .style('text-anchor','middle')
}

function update_cols(){

    var cells = d3.select('#rtiplot')
        .selectAll('rect.cell')
        // .transition()
        .style('stroke',function(d){
            if(ptype == 'v') return get_color(d.v)
            else if(ptype == 'w_l') return get_color(d.w_l)
            else return get_color(d.p_l)
        })
        .style('fill',function(d){
            if(ptype == 'v') return get_color(d.v)
            else if(ptype == 'w_l') return get_color(d.w_l)
            else return get_color(d.p_l)
        })
}

function draw_param_key(){

    var svg = d3.select('#rtiplot')

    svg.append('text')
        .text('Params')
        .attr('x',xmargin+width+130+55)
        .attr('y',250)

    var key_boxes = svg.selectAll(".key_box_p")
        .data(types)
        .enter()
        .append("rect")
        .attr("class","key_box_p")
        .attr("id",function(d){return d+'_box'})
        .attr('x',function(d,i){
            return xmargin+width+130+i*75
        })
        .attr('y',260)
        .attr('height',15)
        .attr('width',15)
        .style('fill',function(d){
            if(d == ptype){
                return 'white'
            }
            else{
                return 'black'
            }
        })


    var key_names = svg.selectAll(".key_name_p")
        .data(types)
        .enter()
        .append("text")
        .attr("class","key_name_p")
        .attr("id",function(d){ return 'n'+d+'_name' })
        .attr('x',function(d,i){
            return xmargin+width+95+i*75
        })
        .attr('y',273)
        .text(function(d){
            if(d == 'v') return 'Vel'
            else if(d == 'w_l') return 'Wid'
            else return 'Pow'
        })


    key_boxes.on('click',function(d){
        ptype = d
        sclmax = defmaxs[types.indexOf(d)]
        svg.selectAll('.key_box_p')
            .style('fill',function(d){
                if(d == ptype){
                    return 'white'
                }
                else{
                    return 'black'
                }
            })
        d3.selectAll('.cbar').remove()
        d3.selectAll('.cbarlabel').remove()

        update_cols()
        draw_colorbar()
        label_colorbar()
    })
}

function draw_beam_key(beams){

    var cols = 4
    var svg = d3.select('#rtiplot')

    svg.append('text')
        .text('Beams')
        .attr('x',xmargin+width+130+55)
        .attr('y',50)

    var key_boxes = svg.selectAll(".key_box")
        .data(beams)
        .enter()
        .append("rect")
        .attr("class","key_box")
        .attr("id",function(d){return d+'_box'})
        .attr('x',function(d,i){
            return xmargin+width+130+(i % cols)*50
        })
        .attr('y',function(d,i){
            return 60+Math.floor(i / cols)*30;
        })
        .attr('height',15)
        .attr('width',15)
        .style('fill',function(d){
            if(d == bmnum){
                return 'white'
            }
            else{
                return 'black'
            }
        })


    var key_names = svg.selectAll(".key_name")
        .data(beams)
        .enter()
        .append("text")
        .attr("class","key_name")
        .attr("id",function(d){ return 'n'+d+'_name' })
        .attr('x',function(d,i){
            return xmargin+width+107+(i % cols)*50
        })
        .attr('y',function(d,i){
            return 73+Math.floor(i / cols)*30;
        })
        .text(function(d){ return d.toString() })


    key_boxes.on('click',function(d){
        bmnum = d;
        svg.selectAll('.key_box')
            .style('fill',function(d){
                if(d == bmnum){
                    return 'white'
                }
                else{
                    return 'black'
                }
            })
        update_data()
    })
}

function update_data(){
    d3.select('#rtiplot')
        .selectAll('rect.cell')
        .remove()

    x = d3.time.scale()
        .domain([times[0],times[times.length-1]])
        .range([xmargin,width+xmargin])

    y = d3.scale.linear()
        .domain([0,maxrange])
        .range([height,50])

    init_data()
    set_tooltips(x,y)

}
function draw_rti(data){

    var svg = d3.select('#chart')
        .append('svg')
        .attr('class','rti')
        .attr('id','rtiplot')
        .attr('height',ymargin*2+height)
        .attr('width',xmargin*2+width+600)
        .attr('x',xmargin)
        .attr('y',ymargin)

    beams = [], dict = {}
    for(var i=0; i<data.length; i++){
        if(dict.hasOwnProperty(data[i]['bmnum'])) continue
        beams.push(data[i]['bmnum'])
        dict[data[i]['bmnum']] = 1
    }
    beams.sort(function(a,b){return a-b})
    
    if(bmnum == null) bmnum = beams[0]



    times = []
    for(var i=0; i<data.length; i++){
        times.push(data[i]['time'])
    }

    maxrange = Math.max.apply(Math, data.map(function(o){
        return o['nrang']
    }))
    console.log(maxrange)

    x = d3.time.scale()
        // .domain([times[0],times[times.length-1]])
        .range([xmargin,width+xmargin])

    x2 = d3.time.scale()
        // .domain([times[0],times[times.length-1]])
        .range([xmargin,width+xmargin])

    x.domain(d3.extent(data.map(function(d) { return d['time']; })));
    x2.domain(x.domain())

    y = d3.scale.linear()
        .domain([0,maxrange])
        .range([height,50])

    y2 = d3.scale.linear().range([20, 0]);

    tempdata = []
    for(var i=0; i<beams.length; i++){
        tempdata.push([])
    }

    for(var i=0; i<data.length; i++){
        for(var j=0; j<data[i].slist.length; j++){
            d = {}
            d['time'] = data[i]['time']
            d['r'] = data[i].slist[j]
            d['v'] = data[i].v[j]
            d['w_l'] = data[i].w_l[j]
            d['p_l'] = data[i].p_l[j]
            tempdata[beams.indexOf(data[i]['bmnum'])].push(d)
        }
    }


    sclmax = defmaxs[types.indexOf(ptype)]

    init_data()
    draw_axis(x,y)
    set_tooltips(x,y)

    draw_colorbar()
    label_colorbar()
    draw_beam_key(beams,data)
    draw_param_key()
    draw_scl_control()


    // svg.append("defs").append("clipPath")
    //     .attr("id", "clip")
    //     .append("rect")
    //     .attr("width", width)
    //     .attr("height", height);


    // xAxis2 = d3.svg.axis().scale(x2).orient("bottom")

    // brush = d3.svg.brush()
    //     .x(x2)
    //     .on("brush", brushed);

    // var context = svg.append("g")
    // .attr("transform", "translate(" + 0 + "," + 470 + ")");

    // var height2 = 30


    // context.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height2 + ")")
    //     .call(xAxis2);


    // context.append("g")
    //     .attr("class", "x brush")
    //     .call(brush)
    //     .selectAll("rect")
    //     .attr("y", -6)
    //     .attr("height", height2 + 7);

    // console.log(brush)
}

function brushed() {

    x.domain(brush.empty() ? x2.domain() : brush.extent());

    d3.selectAll(".x.axis").call(time_axis);

  var dataFiltered = tempdata[beams.indexOf(bmnum)].filter(function(d){
    return ( (d['time'] >= x.domain()[0]) && (d['time'] <= x.domain()[1]) )
  })

  d3.selectAll('rect.cell').data(dataFiltered).enter()

}


jQuery(document).ready(function(){
    jQuery('#plotForm').submit(function(){
        $('input[type=submit]').attr('disabled',true);
        $.ajax({
            url : $(this).attr('action'),
            type: $(this).attr('method'),
            dataType: 'json',
            data: $(this).serialize(),
            success: function(){ prep_query() }
        });
        $('button[type=submit], input[type=submit]').attr('disabled',false);
        return false;
    });
});

function load_data() {
    var request = {'yr': yr, 'mon':mon, 'day':day, 'rad': rad}
    console.log(request)
    $.getJSON('/_load_sd_data', request, function(ps){
        data = []
        tempdata = ps.result
        for(var i=0; i<tempdata.length; i++){
            data.push({})
            data[i]['nrang'] = tempdata[i]['nrang']
            data[i]['bmnum'] = tempdata[i]['bmnum']
            data[i]['slist'] = tempdata[i]['slist']
            data[i]['v'] = tempdata[i]['v']
            data[i]['w_l'] = tempdata[i]['w_l']
            data[i]['p_l'] = tempdata[i]['p_l']
            var t = new Date()
            var mins = t.getTimezoneOffset()
            data[i]['time'] = new Date(Date.UTC(tempdata[i]['yr'],
                tempdata[i]['mon']-1,
                tempdata[i]['day'],
                tempdata[i]['hour'],
                tempdata[i]['min'],
                tempdata[i]['sec'],
                tempdata[i]['us']/1000)+mins*60000)

        }
        d3.select('#loaddiv').remove()
        draw_rti(data)
    })
}

function draw_load(){
    var div = d3.select('body')
        .append('div')
        .style('position','absolute')
        .style('left','45%')
        .style('top','40%')
        .attr('id','loaddiv')

    var img = document.createElement("img");
    img.src = "static/assets/ajax-loader.gif";
    document.getElementById('loaddiv').appendChild(img);

}
function prep_query(){
    d3.select('#rtiplot').remove()
    draw_load()




    yr = document.getElementById('yr').value
    mon = document.getElementById('mon').value
    day = document.getElementById('day').value
    rad = document.getElementById('radarN').value
    load_data()

}



function toggleVisibility(objSel){
    var obj = $(objSel);
    var disp = obj.css("display")
    if (disp=="none" || !disp) {
        obj.fadeIn('slow');
    } 
    else {
        obj.fadeOut('slow');
    }
}
