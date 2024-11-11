import { Controller } from '@hotwired/stimulus';

export default class extends Controller
{
    static targets = [ "sideMenu","mobMenuTrigger"];


   onOpenMenu(){
       this.sideMenuTarget.classList.toggle('open');
   }

    toggleScroll() {
        if (this.mobMenuTriggerTarget.checked) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }
}
