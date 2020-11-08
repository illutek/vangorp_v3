/**
 * Created by stefan on 10-06-2020.
 *
 */


(function () {
  'use strict';

  var openBtnContact = document.querySelector('.js-open-contact');
  var closeBtnContact = document.querySelector('.js-close-contact');
  var contactOverlay = document.querySelector('.r-contact-overlay');

  /** 
   *  Functions
  */

 function closeContact() {
  contactOverlay.classList.remove('r-contact-overlay--visible');
 }

 function openContact() {
  contactOverlay.classList.toggle('r-contact-overlay--visible');
 }

 openBtnContact.addEventListener('click', openContact);
 closeBtnContact.addEventListener('click', closeContact);

})();