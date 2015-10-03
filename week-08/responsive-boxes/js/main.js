/*global $, console*/
(function () {
    'use strict';
    $(document).ready(function () {
        /* Find the hamburger li and attach a click handler */
        $('nav ul:first-child').click(function () {
            /* toggle the class menu-expanded on the ul
            ** be careful with the "this" context as our selector is a pseudo element and "this" refers to the ul
            **/
            $(this).toggleClass('menu-expanded');
        });
    });
}());