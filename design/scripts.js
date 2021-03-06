$(function(){

  // Personal settings

  var params = {
    bodyJsClass: "js_enabled",
    activeClass: "active",
    navSelector: "nav",
    subNavClass: "subnav",
    toggleSpeed: 150
  },

  // Drop down navigation

  nav = $("body").addClass(params.bodyJsClass).find(params.navSelector),
  navLists = nav.find("." + params.subNavClass).hide(),
  navListHeaders = navLists.prev().wrap($("<a/>", {
    href: "#",
    click: function(e){
      var thisList = $(this).next();
      navLists
        .filter(":visible")
        .not(thisList)
        .removeClass(params.activeClass)
        .slideUp(params.toggleSpeed);
      if(thisList.is(":hidden"))
        thisList.addClass(params.activeClass);
      thisList.slideToggle(params.toggleSpeed);
      e.preventDefault();
    }
  })),
  navListHeaderElt = navListHeaders.get(0).nodeName.toLowerCase();

  $(document).bind("click keyup", function(e){
    if(!navLists.is(":visible")) return;
    var eventTarget = $(e.target);
    if(
      (e.type == "keyup" && e.keyCode == 27) ||
      (e.type == "click" && !(
        eventTarget.is(nav.find("a:has(" + navListHeaderElt + ")").selector) ||
        eventTarget.is(nav.find(navListHeaderElt).selector) ||
        eventTarget.is(navLists.find("*").selector)
      ))
    )
      navLists
        .filter(":visible")
        .slideUp(params.toggleSpeed);
  });

});
