import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  @ViewChild(Slides) mySlide: Slides;

  // public slides: any = [
  //   {
  //     title: 'Seus clientes',
  //     text: 'Organize seus clientes e nunca esqueça eventos importantes, como o aniversário deles.',
  //     image: 'assets/images/screen-1.png',
  //     button: 'Próximo'
  //   },
  //   {
  //     title: 'Produtos',
  //     text: 'Tenha na palma da mão todos os nossos produtos.',
  //     image: 'assets/images/screen-2.png',
  //     button: 'Próximo'
  //   },
  //   {
  //     title: 'Registre suas vendas',
  //     text: 'Saiba o que, quando e para quem vendeu.',
  //     image: 'assets/images/screen-4.png',
  //     button: 'Próximo'
  //   },
  //   {
  //     title: 'Acompanhe suas vendas',
  //     text: 'Tenha relatórios mensais de quanto vendeu e controle suas finanças.',
  //     image: 'assets/images/screen-5.png',
  //     button: 'Ok, entendi.'
  //   }
  // ];

  public slides = [
    {
      icon: 'happy', 
      title: 'O que é este app?',
      content: 'Este aplicativo se destina para pessoas que perderam seus animais queridos, e pessoas que querem ajudar a comunidade.'
    },
    {
      icon: 'pin', 
      title: 'Perdeu seu pet?',
      content: 'Cadastre onde perdeu seu animalzinho e sempre que alguém encontrar algum pet próximo, você será notificado'
    },
    {
      icon: 'paw', 
      title: 'Achou um pet?',
      content: 'Ajude a comunidade, se achar um pet na rua, cadastre no aplicativo, e faça alguém se sentir feliz novamente.'
    }
  ];

  public index: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {}

  next() {
    let currentIndex = this.mySlide.getActiveIndex();
    if(currentIndex === this.slides.length - 1) {
      this.navCtrl.setRoot(LoginPage, null, { animate: true });
    } else {
      currentIndex++;
      this.mySlide.slideTo(currentIndex, 500);
    }
  }

  change() {
    this.index = this.mySlide.getActiveIndex();
  }

  skip() {
    this.navCtrl.setRoot(LoginPage, null, { animate: true });
  }

}
