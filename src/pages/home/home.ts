import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from '../music-player/music-player';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public allMusic:any=[];
  constructor(public navCtrl: NavController,private actionSheetController:ActionSheetController,
    private socialSharing:SocialSharing,
    public loadingController:LoadingController,private musicProvider:MusicsProvider) {
  }

  ionViewDidLoad(){
    let allMusicLoadingController= this.loadingController.create({
      content:"Getting your songs from playlist"
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic().subscribe((musicList)=>
    
    {
      allMusicLoadingController.dismiss();
      this.allMusic=musicList});

  }
  shareSong(music){
    let shareSongActionSheet=this.actionSheetController.create({
      title:"Share Song",
      buttons:[
        {
        text:"share on facebook",
        icon:"logo-facebook",
        handler:()=>{
          this.socialSharing.shareViaFacebook(music.name, music.image,music.music_url)
        }

        },
        {
          text:"share on Twitter",
          icon:"logo-twitter",
          handler:()=>{
            this.socialSharing.shareViaTwitter(music.name, music.image,music.music_url)
          }
        },
        {
            text:"share",
            icon:"share",
            handler:()=>{
              this.socialSharing.share(music.name,"", music.image,music.music_url)
            }
        },
        {
          text:"Cancel",
          role:"destructive"
        }
      ]

    });
    shareSongActionSheet.present();
  }
  goToMusic(music){
    this.navCtrl.push(MusicPlayerPage,{
      music:music
    });
  }
}
