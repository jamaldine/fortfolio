$(document).ready(function() {
    $(function() {
        $.getJSON('../data.json', function(data) {
            const schema1 = '<section class="home-skills">'+
            '<h2 class="skill-title">'+data.webIntegrator.name+'</h2>'+
                '<div class="skills"></div>'+
            '</section>';
            $(schema1).appendTo(".home-right");
        });
        $.getJSON('../data.json', function(data) {
            $.each(data.webIntegrator.skills, function(i, item) {
                const schema2 = 
                        '<div class="circle">'+
                            '<img class="circle-img" src='+item.img+' />'+
                        '</div>'+
                        '<div class="skill">'+
                            '<div class="name-percent">'+
                                '<div class="name">'+item.name+'</div>'+
                                '<div class="percent">'+item.percent+'</div>'+
                            '</div>'+
                            '<ul class="breadcrumb">'+
                                
                            '</ul>'+
                        '</div>';
                $(schema2).appendTo(".skills");
            });
        });
        /*$.getJSON('../data.json', function(data) {
            $.each(data.webIntegrator.skills.skillsItem, function(i, item) {
                const schema3 = '<li class="breadcrumb-item"><a class="breadcrumb-name"" href="#">'+item.name+'</a></li>';
                $(schema3).appendTo(".breadcrumb");
            });
        });*/
    });
});