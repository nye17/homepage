jQuery(function($){

  var settings = {
    thumbListId: "thumbs",
    imgViewerId: "viewer",
    activeClass: "active",
    activeTitle: "Image currently displayed",
    loaderTitle: "Loading…",
    loaderImage: "images/loader.gif",
    bigImageAlt: "Next image"
  };

  var thumbLinks = $("#"+settings.thumbListId).find("a"),
      thumbLinksSize = thumbLinks.size(),
      firstThumbLink = thumbLinks.eq(0),
      lastThumbLink = thumbLinks.eq(thumbLinksSize-1),
      loader = $(document.createElement("img")).attr({
        alt: settings.loaderTitle,
        title: settings.loaderTitle,
        src: settings.loaderImage
      }),
      highlight = function(elt){
        thumbLinks.removeClass(settings.activeClass).removeAttr("title");
        elt.addClass(settings.activeClass).attr("title",settings.activeTitle);
      };

  highlight(firstThumbLink);

  $("#"+settings.thumbListId).after(
    $(document.createElement("p"))
      .attr("id",settings.imgViewerId)
      .append(
        $(document.createElement("a"))
          .attr("href","#")
          .append(
            $(document.createElement("img")).attr({
              alt: settings.bigImageAlt,
              src: firstThumbLink.attr("href")
            })
          )
      )
  );

  var imgViewerLink = $("#"+settings.imgViewerId).children(),
      bigPic = imgViewerLink.children(),
      showLoader = function(){
        imgViewerLink.html(loader);
      },
      loadNewImg = function(){
        imgViewerLink.html($(this).fadeIn(250));
      },
      selectActiveThumb = function(){
        return thumbLinks.filter("." + settings.activeClass);
      };

  thumbLinks.click(function(e){
    e.preventDefault();
    var $this = $(this),
        target = $this.attr("href");
    if (bigPic.attr("src") == target) return;
    highlight($this);
    showLoader();
    bigPic
      .load(loadNewImg)
      .attr("src",target);
  });

  imgViewerLink.click(function(e){
    e.preventDefault();
    if (thumbLinksSize < 2) return;
    if (bigPic.attr("src") == lastThumbLink.attr("href")) var isLast = true;
    highlight(
      (isLast)
        ? firstThumbLink
        : selectActiveThumb().parent().next().children()
    );
    showLoader();
    bigPic
      .load(loadNewImg)
      .attr(
        "src",
        (isLast)
          ? firstThumbLink.attr("href")
          : selectActiveThumb().attr("href")
      );
  });

});
