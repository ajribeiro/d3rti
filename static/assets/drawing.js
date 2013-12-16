function set_tooltips(svg,x,y){

    d3.selectAll(".cell")
        .on('mouseover',function(d,i){
            var id = d['time'].toString().replace(/ /g,'')+d.r.toString()
            id = id.replace(/:/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'')
            d3.select('#'+id).style('stroke','yellow')
            d3.select('#'+id).style('fill','yellow')
            d3.select('#'+id).attr('x',function(){
                return x(d['time'])-10
            })
            d3.select('#'+id).attr('width','20')

            d3.select('#'+id).attr('y',function(){
                return y(d.r)-10
            })
            d3.select('#'+id).attr('height','20')


            var g = svg.append('g')
                    .attr("id", 'n'+id)

            var ibox = g.append('rect')
                .attr('class','infobox')
                .attr("x",function(a,b){
                    return x(d['time'])-75;
                })
                .attr("y",function(a) {
                    return y(d.r)-75;
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
                    return y(d.r)-45;
                })

            g.append('text')
                .text(function(){
                    return 'vel: '+Math.round(d.v).toString()+
                            ' wid: '+Math.round(d.w_l).toString()+
                            ' pow: '+Math.round(d.p_l).toString()
                })
                .attr('class','infotext')
                .attr('x',function(){
                    return x(d['time'])+125;
                })
                .attr('y',function(){
                    return y(d.r)-20;
                })
        })
        .on("mouseout", function(d){
            var id = d['time'].toString().replace(/ /g,'')+d.r.toString()
            id = id.replace(/:/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'')
            d3.select('#'+id).style('stroke','white')
            d3.select("#n" + id)
                .remove();
        });
}

function draw_rti(data){
    var svg = d3.select('#chart')
        .append('svg')
        .attr('class','rti')
        .attr('id','rtiplot')
        .attr('height',xmargin*2+width)
        .attr('width',ymargin*2+width)
        .attr('x',xmargin)
        .attr('y',ymargin)

    var dd = data.filter(function(d){return d.bmnum == bmnum})
    console.log('dd')
    console.log(dd)
    times = []
    for(var i=0; i<dd.length; i++){times.push(dd[i]['time'])}

    var maxrange = Math.max.apply(Math, dd.map(function(o){return o['nrang']}))
    console.log(maxrange)
    x = d3.time.scale()
        .domain([times[0],times[times.length-1]])
        .range([xmargin,width+xmargin])

    y = d3.scale.linear()
        .domain([0,maxrange])
        .range([height+ymargin,ymargin])

    tempdata = []
    for(var i=0; i<dd.length; i++){
        for(var j=0; j<dd[i].slist.length; j++){
            d = {}
            d['time'] = dd[i]['time']
            d['r'] = dd[i].slist[j]
            d['v'] = dd[i].v[j]
            d['w_l'] = dd[i].w_l[j]
            d['p_l'] = dd[i].p_l[j]
            tempdata.push(d)
        }
    }
    console.log('adding cells')
    var cells = svg.selectAll('rect.cell')
            .data(tempdata)
            .enter()
            .append('rect')
            .attr('class','cell')
            .attr('x', function(d){
                return x(d['time'])
            })
            .attr('y', function(d){
                return y(d.r-1)
            })
            .attr('width',function(d){
                var ind = times.indexOf(d['time'])+1
                if(ind < times.length) return (x(times[ind])-x(d['time']))
                else return 1
            })
            .attr('height',function(d){
                return y(0)-y(1)
            })
            .style('stroke','white')
            .style('fill','white')

    set_tooltips(svg,x,y)

    // var time_axis = d3.svg.axis()
    //     .scale(time_scale);

    // svg.append("g")
    // .attr("class", "x axis")
    // .attr("transform", "translate(0," + chart_dimensions.height + ")")
    // .call(time_axis);
    // chart.append("g")

    // var cells = svg.selectAll('div.times')
    //     .data(dd)
    //     .enter()
    //     .append('div')
    //         .selectAll('rect.cells')
    //         .data(function(d,i){
    //             console.log(i)
    //             var retarr = []
    //             console.log(d)
    //             for(var j=0; j<d.slist.length; j++){
    //                 da = {}
    //                 da['time'] = d[i].time
    //                 da['r'] = d[i].slist[j]
    //                 da['v'] = d[i].v[j]
    //                 da['w_l'] = d[i].w_l[j]
    //                 retarr.push(da)
    //             }
    //             console.log(retarr)
    //             return retarr
    //         })
    //         .enter()
    //         .append('rect')
    //         .attr('x', function(d){
    //             return x(d.time)
    //         })
    //         .attr('y', function(d){
    //             return y(d.r)
    //         })
    //         .attr('width',2)
    //         .attr('height',function(d){
    //             return y(0)-y(1)
    //         })
    //         .style('stroke','white')
    //         .style('fill','white')

}



