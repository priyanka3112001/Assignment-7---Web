
document.querySelector('.btn').onclick = function(){
    
    var[text1, text2,text3] = document.querySelectorAll('#txt');

    var[r1,r2,r3] = document.querySelectorAll('.result');
    r1.innerHTML = 'NA' ;
    r2.innerHTML = 'NA' ;
    r3.innerHTML = 'NA' ;
    r1.style.color = 'white' ;
    r2.style.color = 'white' ;
    r3.style.color = 'white' ;
    var msg = '';
    if(text1.value == '' || text2.value == '' || text3.value == ''){
        msg = 'All Fields are required';
    }
    else if( isNaN(text1.value) || isNaN(text2.value) || isNaN(text3.value )){
        msg = 'Please enter valid number';
    }
    else if(text1.value > 100 || text2.value > 100 || text3.value > 100 || text1.value < 35 || text2.value < 35 || text3.value < 35){
            msg = 'Fail';

    }
    else{
        var P = parseInt(text1.value);
        var C = parseInt(text2.value);
        var M = parseInt(text3.value);

        var total = P + C + M;
        var percentage = (total/300) * 100;

        
        r1.innerHTML = total ;
       
        r2.innerHTML = percentage.toFixed(2);
        
        var grade = "II";
       
        grade = (percentage<60)?"II":( (percentage<70)?"I":"Distinction" );
        r3.innerHTML = grade;
        
    
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'PCM',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Physics',
                    y:P,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Chemistry',
                    y:C
                },  {
                    name: 'Maths',
                    y:M
                }]
            }]
        });

      
       
    }

    document.querySelector('.errmsg').innerHTML = msg;
}