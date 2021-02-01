$(document).ready(function() {
    $(function() {
        $.getJSON('../data.json', function(data) {
            const schema1 = '<section class="home-skills">'+
            '<h2 class="skill-title">'+data.webIntegrator.name+'</h2>'+
                '<div class="skills-list"></div>'+
                '<div class="single-item"></div>'+
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
                            '<ul class="breadcrumb-'+i+'">'+
                            
                            '</ul>'+
                        '</div>';
                $(schema2).appendTo(".skills-list");
            });
        });

        $.getJSON('../data.json', function(data) {
            $.each(data.webIntegrator.skills, function(i, items) {
                $.each(items.skillsItem, function(i, item) {
                    const schema3 = '<li class="breadcrumb-item"><a class="breadcrumb-name"" href="#">'+item.name+'</a></li>';
                    $(schema3).appendTo(`.breadcrumb-${i}`);
                });
            });
        });

       $.getJSON('../data.json', function(data) {
            $.each(data.webIntegrator.singleSkills, function(i, item) {
                const schema4 = '<div class="single-name" >' + item.name + '</div>';
                $(schema4).appendTo(".single-item");
            });
        });
    });
});