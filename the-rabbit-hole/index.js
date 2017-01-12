var bioData = '{"results":[{"bioguide_id":"D000622","birthday":"1968-03-12","chamber":"senate","contact_form":null,"crp_id":"N00027860","district":null,"facebook_id":"112300955610529","fax":null,"fec_ids":["H6IL06141"],"first_name":"Tammy","gender":"F","govtrack_id":"412533","icpsr_id":21325,"in_office":true,"last_name":"Duckworth","lis_id":"S386","middle_name":null,"name_suffix":null,"nickname":null,"oc_email":null,"ocd_id":"ocd-division/country:us/state:il","office":"G12 Dirksen Senate Office Building","party":"D","phone":"202-224-2854","senate_class":3,"state":"IL","state_name":"Illinois","state_rank":"junior","term_end":"2023-01-03","term_start":"2017-01-03","thomas_id":"02123","title":"Sen","twitter_id":"RepDuckworth","votesmart_id":57442,"website":null,"youtube_id":"repduckworth"},{"bioguide_id":"R000515","birthday":"1946-11-23","chamber":"house","contact_form":null,"crp_id":"N00004887","district":1,"facebook_id":"230753786936538","fax":null,"fec_ids":["H2IL01042"],"first_name":"Bobby","gender":"M","govtrack_id":"400350","icpsr_id":29346,"in_office":true,"last_name":"Rush","middle_name":"L.","name_suffix":null,"nickname":null,"oc_email":"Rep.Rush@opencongress.org","ocd_id":"ocd-division/country:us/state:il/cd:1","office":"2188 Rayburn House Office Building","party":"D","phone":"202-225-4372","state":"IL","state_name":"Illinois","term_end":"2019-01-03","term_start":"2017-01-03","thomas_id":"01003","title":"Rep","twitter_id":"RepBobbyRush","votesmart_id":26831,"website":"http://rush.house.gov","youtube_id":"CongressmanRush"},{"bioguide_id":"L000563","birthday":"1966-07-15","chamber":"house","contact_form":null,"crp_id":"N00027239","district":3,"facebook_id":"103286879730089","fax":null,"fec_ids":["H4IL03077"],"first_name":"Daniel","gender":"M","govtrack_id":"400630","icpsr_id":20508,"in_office":true,"last_name":"Lipinski","middle_name":"William","name_suffix":null,"nickname":null,"oc_email":"Rep.Lipinski@opencongress.org","ocd_id":"ocd-division/country:us/state:il/cd:3","office":"2346 Rayburn House Office Building","party":"D","phone":"202-225-5701","state":"IL","state_name":"Illinois","term_end":"2019-01-03","term_start":"2017-01-03","thomas_id":"01781","title":"Rep","twitter_id":"RepLipinski","votesmart_id":33692,"website":"http://lipinski.house.gov","youtube_id":"lipinski03"},{"bioguide_id":"D000563","birthday":"1944-11-21","chamber":"senate","contact_form":"http://www.durbin.senate.gov/public/index.cfm/contact","crp_id":"N00004981","district":null,"facebook_id":"180436795325335","fax":"202-228-0400","fec_ids":["S6IL00151","H2IL20026"],"first_name":"Richard","gender":"M","govtrack_id":"300038","icpsr_id":15021,"in_office":true,"last_name":"Durbin","leadership_role":"Minority Whip","lis_id":"S253","middle_name":"J.","name_suffix":null,"nickname":null,"oc_email":"Sen.Durbin@opencongress.org","ocd_id":"ocd-division/country:us/state:il","office":"711 Hart Senate Office Building","party":"D","phone":"202-224-2152","senate_class":2,"state":"IL","state_name":"Illinois","state_rank":"senior","term_end":"2021-01-03","term_start":"2015-01-06","thomas_id":"00326","title":"Sen","twitter_id":"SenatorDurbin","votesmart_id":26847,"website":"http://www.durbin.senate.gov","youtube_id":"SenatorDurbin"}],"count":4,"page":{"count":4,"per_page":20,"page":1}}';

var committeeData = '{"results":[{"chamber":"house","committee_id":"HSIF","name":"House Committee on Energy and Commerce","office":"2125 RHOB","phone":"(202) 225-2927","subcommittee":false},{"chamber":"house","committee_id":"HSIF16","name":"Communications and Technology","parent_committee_id":"HSIF","phone":"(202) 225-2927","subcommittee":true},{"chamber":"house","committee_id":"HSIF17","name":"Commerce, Manufacturing, and Trade","parent_committee_id":"HSIF","phone":"(202) 225-2927","subcommittee":true},{"chamber":"house","committee_id":"HSIF03","name":"Energy and Power","parent_committee_id":"HSIF","phone":"(202) 225-2927","subcommittee":true}],"count":4,"page":{"count":4,"per_page":20,"page":1}}';

function clearResults() {
  document.getElementById('zip').value = '';
  document.getElementById('results').innerHTML = '';
}

function calculateAge(birthday) {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function getCORS(url, success) {
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
  xhr.open('GET', url);
  xhr.onload = success;
  xhr.send();
  return xhr;
}

function search() {
  var zip = document.getElementById('zip').value;
  if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
    var url = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip + '&apikey=b67743bc991c48129aa16bc7dd0cdd83&callback=';

    getCORS(url, function(request){
      var response = request.currentTarget.response || request.target.responseText;
      var results = '<div class="row"><h1>Results for ' + zip + ':</h1></div>';
      var object = JSON.parse(response);
      
      for (var i = 0; i < object.count; i++) {
        results += assembleBio(object.results[i]);
      }
      document.getElementById('results').innerHTML = results;
    });
  } else {
    alert('An invalid zip code was entered.');
  }
}

function fillUp() {
  var object = JSON.parse(bioData);
  var results = '';
  
  for (var i = 0; i < object.count; i++) {
    results += assembleBio(object.results[i]);
  }
  document.getElementById('results').innerHTML = results;
}

function assembleBio(rep) {
  results = '<div class="col-lg-3">';
    
  results += '<h3>' + rep.first_name + ' ' + rep.last_name + ' ' + rep.party + ', ' + rep.chamber.capitalize() + '</h3>';

  results += '<a href="' + rep.website + '" target="_blank"><img src="https://theunitedstates.io/images/congress/225x275/' + rep.bioguide_id + '.jpg" onerror="this.src=\'http://3.bp.blogspot.com/-Lcr2wUgl-HA/VS_34Sr2tiI/AAAAAAAAACA/3RmK6UHgYvs/s1600/mr%2Bbean%2Bhalloween.png\'" width="225" height="275" class="img-rounded" /></a>';

  results += '<p>';

  results += '<a href="http://www.facebook.com/' + rep.facebook_id + '" target="_blank"><i class="fa fa-facebook-square fa-2x"></i></a> ';
  
  results += '<a href="http://www.twitter.com/' + rep.twitter_id + '" target="_blank"><i class="fa fa-twitter-square fa-2x"></i></a> ';
  
  results += '<a href="http://www.youtube.com/user/' + rep.youtube_id + '" target="_blank"><i class="fa fa-youtube-square fa-2x"></i></a> ';
  
  results += '<a href="https://en.wikipedia.org/wiki/' + rep.first_name + '_' + rep.last_name + '" target="_blank"><i class="fa fa-wikipedia-w fa-2x"></i></a>';

  results += '</p>';
  
  // results += '<button class="btn btn-default" onclick="searchCommittees(\'' + rep.bioguide_id + '\')"><i class="fa fa-users"></i> See Committees</button>';

  results += '<h4>Age: ' + calculateAge(rep.birthday) + '</h4>';

  termStart = new Date(rep.term_start);
  termEnd = new Date(rep.term_end);

  results += '<h4>Term Start: ' + termStart.toLocaleDateString() + '</h4>';

  results += '<h4>Term End: ' + termEnd.toLocaleDateString() + '</h4>';

  results += '</div>';
  
  return results;
}

function searchCommittees(id) {
    var url = 'https://congress.api.sunlightfoundation.com/committees?member_ids=' + id + '&apikey=b67743bc991c48129aa16bc7dd0cdd83&callback=';

  getCORS(url, function(request){
    var response = request.currentTarget.response || request.target.responseText;
    var results = '';
    var object = JSON.parse(response);
    
    for (var i = 0; i < object.count; i++) {
      results += assembleCommittee(object.results[i]);
    }
    document.getElementById('results').innerHTML = results;
  });
}

function assembleCommittee(committee) {
  results = '<div class="col-lg-3">';
    
  results += '<h3>' + committee.name + '</h3>';

  results += '</div>';
  
  return results;
}