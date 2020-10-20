
var config = {
    apiKey: "AIzaSyCWKY0TSZC0uzbISUqws3RYAwSM6oE36-E",
    authDomain: "mplad-58828.firebaseapp.com",
    databaseURL: "https://mplad-58828.firebaseio.com",
    projectId: "mplad-58828",
    storageBucket: "mplad-58828.appspot.com",
    messagingSenderId: "238810137051"
  };
var app=firebase.initializeApp(config);
const firestore=firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var i=1;
firestore.collection("WorkRecommended").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots

        var d = document.getElementById("wl");				//a new div is created
    	var newDiv = document.createElement("div");
    	newDiv.setAttribute('id', "workbox"+i);
        newDiv.className='workboxdiv';
    	//newDiv.innerHTML = doc.data().workTitle;
    	d.appendChild(newDiv);									//new div inserted inside another div

    	//var h=document.getElementById("workbox"+i);				//newly created div get selected
    	
    	var newH2=document.createElement("h5");				//a new h3 tag is created for workTitle
    	newH2.setAttribute('id',"worktitle"+i);
        newH2.className='workboxdivContent';
    	newH2.innerHTML="Work Title: "+doc.data().WorkTitle;
    	newDiv.appendChild(newH2);

    	var newh3=document.createElement('h6');					//new h3 tag for work sector
    	newh3.setAttribute('id','worksector'+i);
       
    	newh3.innerHTML="Work Sector : "+doc.data().WorkSector;
    	newDiv.appendChild(newh3);
        newh3.className='workboxdivContent';
        
        
    	var newH4=document.createElement('h6');
        newH4.setAttribute('id','worklocation'+i);
        newH4.className='workboxdivContent';
    	newH4.innerHTML=doc.data().workLocation;
    	newDiv.appendChild(newH4);

//    	var newp=document.createElement('p');				//new p tag created for work description
//    	newp.setAttribute('id','workdescription'+i);
//        newp.setAttribute('style','color:black;');
//    	newp.innerHTML="Work Description :"+doc.data().Description;
//    	newDiv.appendChild(newp);

    	


    //for voting

    	var voteButton=document.createElement('input');
    	voteButton.setAttribute('type','button');
    	voteButton.setAttribute('value','♡');
        voteButton.className ="votebutton";
    	voteButton.setAttribute('id','votebutton'+i);
    	newDiv.appendChild(voteButton);
    	document.getElementById('votebutton'+i).onclick=function (){
            
             voteButton.disabled='true';
             voteButton.setAttribute('value','❤️');
            
    		firestore.collection('WorkRecommended').doc(doc.id).update({
    			       Vote:doc.data().Vote+1
    			    })				
    	        .then(function(){console.log('Voted')})				
    	        .catch(function(error){console.log('Error occured')})
            
           
    	       }

    //voting complete	







    //new div for comments

    	var cmntDiv=document.createElement('div');				
    	cmntDiv.setAttribute('id','commentsonwork'+i);
        cmntDiv.className='cmnt';
    	cmntDiv.style.display='none';
        newDiv.appendChild(cmntDiv);

        
        var seecmnt=document.createElement('input');
    	seecmnt.type='button';
    	seecmnt.value='Show Comments';
    	seecmnt.className='seecmnt';
    	newDiv.appendChild(seecmnt);
    	seecmnt.onclick=function (){
                                 
                            morebtn.style.display='none';
            
    						cmntDiv.style.display='block';
    						seecmnt.style.display='none';
    						var hidecmnt=document.createElement('input');
    						hidecmnt.type='button';
    						hidecmnt.value='▲ hide comments';
    						hidecmnt.className='hidecmnts';
    						hidecmnt.style.display='block';
    						newDiv.appendChild(hidecmnt);
    						hidecmnt.onclick=()=>{
                                            
                                             morebtn.style.display='block';
                                
    										seecmnt.style.display='block';
    										cmntDiv.style.display='none';
    										hidecmnt.style.display='none';
    									}

    					}



        
        
    	 //add new comments

    	var cmntbutton=document.createElement('input');
    	cmntbutton.type='button';
        
        cmntbutton.className='addcomment';
        
    	cmntbutton.id='cmntbutton'+i;
    	cmntbutton.value='Add Comment ';
    	cmntDiv.appendChild(cmntbutton);
    	cmntbutton.onclick= ()=>{
            
                                  cmntbutton.style.display='none';
                              
    							var cmntinput=document.createElement('input');                   //post ur comments
    							cmntinput.type='text';
    							cmntinput.name='mycomments';
    							cmntinput.placeholder='enter text';
    							cmntDiv.appendChild(cmntinput);

    							var submitcmnt=document.createElement('input');					//submit cmnt button
    							submitcmnt.type='button';
    							submitcmnt.value='Post';
    							cmntDiv.appendChild(submitcmnt);
    							submitcmnt.onclick=()=>{
    													
    														cmntbutton.style.display='block';
    														firestore.collection('WorkRecommended/'+doc.id+'/Comments').doc(/*'comment'+i+k*/).set({
    															Comment: cmntinput.value,
    															Dislike:0,
    															Like:0,
    															Name:"",
    															Email_Id:"",
    															TimeDate:Date()
    														}).then(()=>{
    																		alert('Commented');
    																		cmntinput.style.display='none';
    																		submitcmnt.style.display="none";
    																		var newcmntsubmit=document.createElement('p');
    																		newcmntsubmit.id=j+'cmntid'+i;
    																		newcmntsubmit.innerHTML=cmntinput.value;
    																		cmntDiv.appendChild(newcmntsubmit);

    																		
    																	}).catch((error)=>{alert('error'+error)})		
    								
    							                   }
    							               }
    	//newDiv.appendChild(cmntbutton);
    	





    //to display all comments
    	var j=0;
    	 firestore.collection('WorkRecommended/'+doc.id+'/Comments').get().then((query)=>{
    	 		query.forEach((cmnt)=>{
    	 			var cmnts=document.createElement('p');
                    
                    cmnts.className='commentbox';
                    
    	 			cmnts.id=j+'cmntid'+i;
    	 			cmnts.innerHTML=cmnt.data().Comment;
    	 			cmntDiv.appendChild(cmnts);
    	 			
    	 			var likecmnt=document.createElement('input');
    	 			likecmnt.type='button';
    	 			likecmnt.className='likeButton';
    	 			likecmnt.value='👍';
    	 			cmntDiv.appendChild(likecmnt);
    	 			likecmnt.onclick=()=>{
    	 			
                        likecmnt.disabled='true';
    	 				firestore.collection('WorkRecommended/'+doc.id+'/Comments').where("Comment","==",cmnt.data().Comment).get().then((query3)=>{query3.forEach((d)=>{/*likecount=d.data().Like+1*/firestore.collection('WorkRecommended/'+doc.id+'/Comments').doc(cmnt.id).update({
    	 					'Like':d.data().Like+1
    	 				}).then(console.log("liked"))})})
    	 				
    	 			}

    	 			var dislikecmnt=document.createElement('input');
    	 			dislikecmnt.type='button';
    	 			dislikecmnt.className='dislikebutton';
    	 			dislikecmnt.value='👎';
    	 			cmntDiv.appendChild(dislikecmnt);
    	 			dislikecmnt.onclick=()=>{
    	 			
    	 			
                          dislikecmnt.disabled='true';
                        
                    firestore.collection('WorkRecommended/'+doc.id+'/Comments').where("Comment","==",cmnt.data().Comment).get().then((query3)=>{query3.forEach((d)=>{/*likecount=d.data().Like+1*/firestore.collection('WorkRecommended/'+doc.id+'/Comments').doc(cmnt.id).update({
    	 					'Dislike':d.data().Dislike+1
    	 				}).then(console.log("Disliked"))})})
    	 				
    	 			}
    	 		j++;
    	 		})
    	 })
    	 //comments displayed


         //more button to display complete details of a work

    	 var morebtn=document.createElement('input');
    	 morebtn.type='button';
    	 morebtn.value='More';
    	 morebtn.id='morebutton'+i;
    	 morebtn.className='morebtn';
    	 newDiv.appendChild(morebtn);
       	 morebtn.onclick=function (){

    						var hideworkdetails=document.createElement('input');
    						hideworkdetails.type='button';
    						hideworkdetails.value='▲';
                            hideworkdetails.className='hidebtn';
    						newDiv.appendChild(hideworkdetails);
    						hideworkdetails.onclick=function (){
    											workDash.style.display='none';
    											morebtn.style.display='block';
    											hideworkdetails.style.display='none';
    										}



    	 					var workDash=document.createElement('div');
    	 					workDash.className='workboxdivContent';
    	 					workDash.id='workdashboard'+i;
    	 					workDash.style.display='block';
    	 					newDiv.appendChild(workDash);

    	 					morebtn.style.display='none';


    	 					
    	 					var wTitle=document.createElement("h5");				//a new h2 tag is created for workTitle
    						wTitle.setAttribute('id',"worktitle"+i);
    						wTitle.innerHTML="Work Title: "+doc.data().WorkTitle;
    						workDash.appendChild(wTitle);

    	 					var wSector=document.createElement('h6');					//new h3 tag for work sector
    						wSector.setAttribute('id','worksector'+i);
    						wSector.innerHTML="Work Sector : "+doc.data().WorkSector;
    						workDash.appendChild(wSector);

    						var wLocation=document.createElement('h6');
    						wLocation.setAttribute('id','worklocation'+i);
    						wLocation.innerHTML='Location:   '+doc.data().workLocation;
    						workDash.appendChild(wLocation);

    						var wConstituency=document.createElement('h6');
    						wConstituency.className='workconst';
    						wConstituency.id='wConst'+i;
    						wConstituency.innerHTML='Constituency: '+doc.data().Constituency;
    						workDash.appendChild(wConstituency);

    						var recomBy=document.createElement('h5');
    						recomBy.id='recommendedby'+i;
    						recomBy.className='recomby';
    						recomBy.innerHTML='Recommended By :'+doc.data().WorkRecommendedBy;
    						workDash.appendChild(recomBy);


    						var wDescription=document.createElement('p');				//new p tag created for work description
    						wDescription.setAttribute('id','workdescription'+i);
    						wDescription.innerHTML="Work Description :"+doc.data().Description;
    						workDash.appendChild(wDescription);

    						var wVotes=document.createElement('p');
    						wVotes.className='workvote';
    						wVotes.id='wVote'+i;
    						wVotes.innerHTML='Total Votes: '+doc.data().Vote;
    						workDash.appendChild(wVotes);

    						var k=0;
    						var mps;
    						var mplist=document.createElement('h6');
    						mplist.innerHTML='This work is recommended to following mps';
    						workDash.appendChild(mplist);
    						while(doc.data().WorkForMp[k]){

    											mps=document.createElement('p');
    											mps.className='mpname';
    											mps.id=k+'mpnames'+i;
    											mps.innerHTML=(k+1)+':'+doc.data().WorkForMp[k];
    											workDash.appendChild(mps);
    											k++;
    										}

    						



    	 				}





        


    	i++;
    })
    	
});
