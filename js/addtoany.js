var a2a_config = a2a_config || {};
a2a_config.callbacks = a2a_config.callbacks || [];
a2a_config.callbacks.push({
    ready: my_addtoany_onready
});
a2a_config.locale = "es";

(function(){
  //https://www.addtoany.com/buttons/customize/asynchronous_loading
  //https://www.addtoany.com/buttons/customize/single_button_specific_page
  //IMPORTANTE CARGAR ADDTOANY DE ESTA MANERA

  var a = document.createElement('script');
  a.async = true;
  a.src = 'https://static.addtoany.com/menu/page.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(a, s);
})();

/*share ready*/
function my_addtoany_onready() {
  //QueryParams
  var urlParams = new URLSearchParams(window.location.search);
  var p_share_url = urlParams.get('shareURL');
  var p_title = urlParams.get('title');

  //{{ast}}->&
  p_share_url = p_share_url.replace(/{{ast}}/g,'&');
  //p_share_url = p_share_url.replace(/\s/g,'_');
  p_share_url = p_share_url.replace(/\s/g,'%20');
  a2a_config.locale = "es"
  a2a_config.target = '.share-this';
  a2a_config.linkname = p_title + ' - ¡Conoce las 👻leyendas, mitos e historias de terror de México 😱!';
  a2a_config.linkurl = p_share_url;
  a2a.init('page');
}
