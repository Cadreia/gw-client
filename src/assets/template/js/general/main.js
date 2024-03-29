
//set variables for event location map display

var geocoder;
var map;
var map_large;
var address =$('#eventVenue').val();


$(document).ready(function () {

   // new UISearch(document.getElementById('sb-search'));

    $("#saveTicketForm").submit(function(e){
        e.preventDefault();

    });

    //animate background color
    animateBackGroundDesign();

    //initiatlize google map for event location or venue on page load
    initializeEventVenueMap();
    initializeEventVenueMapLarge();



//get the current time in unix timestamp seconds

    var seconds = new Date().getTime() / 1000;

// var endTime = 'Your end time';


    if ($(".clock").length > 0) {
        $('.clock').final_countdown({

            'start': 1402444800,
            'end': 1405036800,
            'now': seconds,

            seconds: {
                borderColor: '#2c3e50',
                borderWidth: '5'
            },
            minutes: {
                borderColor: '#2c3e50',
                borderWidth: '5'
            },
            hours: {
                borderColor: '#2c3e50',
                borderWidth: '5'
            },
            days: {
                borderColor: '#2c3e50',
                borderWidth: '5'
            }

        });

    }


//Affix Navigation	
    if ($(".main-header").length > 0) {
        $('.main-header').affix({
            offset: {
                top: 50
            }
        });
    }


    if ($(".tabs").length > 0) {
        $(".tabs").tabs();
    }

    if ($("#speakers-tabs").length > 0) {
        $('#speakers-tabs').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true,   // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            activate: function (event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#tabInfo');
                var $name = $('span', $info);

                $name.text($tab.text());

                $info.show();
            }

        });
    }

    if ($(".owl-team").length > 0) {
        $('.owl-team').owlCarousel({
            items: 1,
            loop: true,
            margin: 20,
            dots: false,
            nav: true,
            navText: ['', ''],
            navSpeed: 600,
            responsive: {
                320: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                991: {
                    items: 3
                },
                1170: {
                    items: 3
                }
            }
        });
    }

    if ($(".owl-sponsored").length > 0) {
        $('.owl-sponsored').owlCarousel({
            items: 1,
            loop: true,
            margin: 20,
            dots: false,
            nav: true,
            navText: ['', ''],
            navSpeed: 600,
            responsive: {
                320: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                991: {
                    items: 4
                },

                1170: {
                    items: 5
                }
            }
        });
    }


    if ($(".owl-testimonial").length > 0) {
        $('.owl-testimonial').owlCarousel({
            items: 1,
            loop: true,
            margin: 20,
            dots: false,
            nav: false,
            autoplay: true,
            navSpeed: 600,
            responsive: {
                1170: {
                    items: 1
                }
            }
        });
    }


    /*serch*/


    /*event-filter*/
    $(".stylegrid").addClass('active');
    $('.grid-list').addClass('itemgrid');

    $(".event-filter li.filter").click(function (e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

        if ($(this).hasClass("stylelist")) {
            $('.grid-list').addClass('itemlist');
            $('.grid-list').removeClass('itemgrid');
            $('.itemlist .col-md-4').addClass('col-md-12').removeClass('col-md-4');
            $('.itemlist .col-md-3').addClass('col-md-12').removeClass('col-md-3');
        }

        if ($(this).hasClass("stylegrid")) {
            $('.grid-list').addClass('itemgrid');
            $('.grid-list').removeClass('itemlist');
            $('.itemgrid .col-md-12').addClass('col-md-4').removeClass('col-md-12');
            $('.checkcolumn.itemgrid .col-md-4').addClass('col-md-3').removeClass('col-md-4');
        }

        e.preventDefault();
    });


//Drop-Down Menu
    $(".main-nav li,.main-nav .sub-menu li").hover(function () {
        $('a', this).addClass('current');
        $(this).children('ul').css({visibility: "visible", display: "none"}).slideDown(400);
    }, function () {
        $('a', this).removeClass('current');
        $('ul', this).css({visibility: "hidden", display: "none"});
    });

//moblie menu

    $(".mobile-menu-icon").click(function () {

        $('.mobile-menu ul').slideToggle(400);
    });


    /*datetimepicker8*/
    $('.open').click(function () {
        $('.date_timepicker_start').datetimepicker('show');
    })

    $('.end').click(function () {
        $('.date_timepicker_end').datetimepicker('show');
    })

    $(function () {
        $('.date_timepicker_start').datetimepicker({
            format: 'd/m/Y',
            onShow: function (ct) {
                this.setOptions({
                    maxDate: $('.date_timepicker_end').val() ? $('.date_timepicker_end').val() : false
                })
            },

            timepicker: false
        });

        $('.date_timepicker_end').datetimepicker({
            format: 'd/m/Y',
            onShow: function (ct) {
                this.setOptions({
                    minDate: $('.date_timepicker_start').val() ? $('.date_timepicker_start').val() : false
                })
            },
            timepicker: false
        });
    });


    /*map*/
    if ($("#contact-map").length > 0) {
        $("#contact-map").gmap3({
            marker: {
                latLng: [46.578498, 2.457275],
                options: {
                    draggable: true
                },
                events: {
                    dragend: function (marker) {
                        $(this).gmap3({
                            getaddress: {
                                latLng: marker.getPosition(),
                                callback: function (results) {
                                    var map = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({get: "infowindow"}),
                                        content = results && results[1] ? results && results[1].formatted_address : "no address";
                                    if (infowindow) {
                                        infowindow.open(map, marker);
                                        infowindow.setContent(content);
                                    } else {
                                        $(this).gmap3({
                                            infowindow: {
                                                anchor: marker,
                                                options: {content: content}
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            },
            map: {
                options: {
                    zoom: 5
                }
            }
        });
    }


// validate form on keyup and submit
    $("#contactform").validate({
        rules: {
            contactname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true,
                minlength: 2
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            contactname: {
                required: "Please enter your name",
                minlength: jQuery.format("Your name needs to be at least {0} characters")
            },
            email: {
                required: "Please enter a valid email address",
                minlength: "Please enter a valid email address"
            },
            subject: {
                required: "You need to enter a subject!",
                minlength: jQuery.format("Enter at least {0} characters")
            },
            message: {
                required: "You need to enter a message!",
                minlength: jQuery.format("Enter at least {0} characters")
            }
        },
// set this class to error-labels to indicate valid fields
        success: function (label) {
            label.addClass("checked");
        },

    });

    /*slider-range*/
    if ($("#slider-range").length > 0) {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 100000,
            values: [20000, 90000],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));
    }

});


//set up the background color design color based on the above rand class color

function animateBackGroundDesign() {


    $background_color = $('#background_color_event_select').val();



    $backHead = $('#backHeadTop');
    $eventMapLarge=$("#eventMapLarge");

    $backTicketDiv = $('#backTicketDiv');

    $backDetailDiv = $('#backDetailDiv');

    $backHelpDiv = $('#backHelpDiv');

    $backLikeDiv = $('.add_like');

    $backShareDiv = $('#backShareDiv');

    $backWhereDiv = $('#backWhereDiv');

    $backTagDiv = $('#backTagDiv');

    $backOrganizerDiv = $('#backOrganizerDiv');

    $backCommentDiv = $('#backCommentHeadDiv');

    $backOrganizerTweetDiv = $('#backOrganizerTweetDiv');

    $orderNowBtn = $('#orderNowBtn');

    $contactOrganiserBtn = $('#contactOrganiserBtn');

    $sum_order_total = $('#sum_order_total');

    $free_btn_order_total = $('#free_btn_order_total');

    $paymentDivP = $('#payment_div');

    $relatedEvent = $('#relatedEvent');

    $fullDate_1 = $('#fullDate_1');

    $fullDate_2 = $('#fullDate_2');

    $fullDate_3 = $('#fullDate_3');

    $addCommentBtn = $('.btn-primary');

    $addShareDiv = $('.shareDiv');

    //add the rand class to the above main divs of the event page

    $backHead.addClass($background_color);
    $backTicketDiv.addClass($background_color);
    $backDetailDiv.addClass($background_color);
    $backHelpDiv.addClass($background_color);
    $backLikeDiv.addClass($background_color);
    $backShareDiv.addClass($background_color);
    $backWhereDiv.addClass($background_color);
    $backTagDiv.addClass($background_color);
    $backOrganizerDiv.addClass($background_color);
    $backCommentDiv.addClass($background_color);
    $backOrganizerTweetDiv.addClass($background_color);
    $orderNowBtn.addClass($background_color);
    $contactOrganiserBtn.addClass($background_color);
    $free_btn_order_total .addClass($background_color);
    $sum_order_total .addClass($background_color);
    $paymentDivP .addClass($background_color);
    $relatedEvent .addClass($background_color);
    $fullDate_1 .addClass($background_color);
    $fullDate_2 .addClass($background_color);
    $fullDate_3 .addClass($background_color);
    $addCommentBtn.addClass($background_color);
    $addShareDiv.addClass($background_color);
    $eventMapLarge.addClass($background_color);
}

 function changeEventTitlePage(title){

     $(this).attr("title", title);

 }

function initializeEventVenueMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    if (geocoder) {
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter(results[0].geometry.location);

                    var infowindow = new google.maps.InfoWindow(
                        { content: '<b>'+address+'</b>',
                            size: new google.maps.Size(150,50)
                        });

                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title:address
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map,marker);
                    });

                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}


//This function is used to display the event map location large
function initializeEventVenueMapLarge() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map_large = new google.maps.Map(document.getElementById("map-canvas-large"), myOptions);
    if (geocoder) {
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map_large .setCenter(results[0].geometry.location);

                    var infowindow = new google.maps.InfoWindow(
                        { content: '<b>'+address+'</b>',
                            size: new google.maps.Size(150,50)
                        });

                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map_large ,
                        title:address
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map_large ,marker);
                    });

                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}

$(window).on('load', function () {
    var nextYear = (new Date().getFullYear() + 1) + "/01/12/",
        template = _.template($('#upcomeing-events-template').html()),
        currDate = '00:00:00:00',
        nextDate = '00:00:00:00',
        parser = /([0-9]{2})/gi;
    // Parse countdown string to an object

    function strfobj(str) {
        var parsed = str.match(parser),
            obj = {};
        obj['weeks'] = parsed[0];
        obj['days'] = parsed[1];
        obj['hours'] = parsed[2];
        obj['minutes'] = parsed[3];
        obj['seconds'] = parsed[4];
        return obj;
    }

    // Return the time components that diffs
    function diff(obj1, obj2) {
        var diff = [];
        ['weeks', 'days', 'hours', 'minutes', 'seconds'].forEach(function (key) {
            if (obj1[key] !== obj2[key]) {
                diff.push('.' + key);
            }
        });
        return diff;
    }


    // Starts the countdown
    $('#upcomeing-events').countdown(nextYear, function (event) {
        var newDate = event.strftime('%w:%d:%H:%M:%S'),
            data, $countdown;
        if (newDate !== nextDate) {
            $countdown = $(this);
            currDate = nextDate;
            nextDate = newDate;
            // Setup the data
            data = {
                'curr': strfobj(currDate),
                'next': strfobj(nextDate)
            };
            // Update the template
            $countdown.html(template(data));
            // Delay this function to after this callback
            _.delay(function () {
                $countdown.find(diff(data.curr, data.next).join(', '))
                    .addClass('animate')
            }, 1);
        }
    });
});


//video
if ($("audio,video").length > 0) {
    $('audio,video').mediaelementplayer({
        success: function (player, node) {
            $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
        }
    });
}


var count = 9,
    flickrid = '83457042@N00';

$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?ids=" + flickrid + "&lang=en-us&format=json&jsoncallback=?", function (data) {

    window.a = (data);
    $.each(data.items, function (index, item) {

        if (index < count) {
            $("<img />").attr("src", item.media.m).appendTo(".flickrwidget")
                .wrap("<a href='" + item.link + "'></a>");

        }
        else {
            return;
        }
    });
});
