

/*
Mongoose is a mongodb object modeling tool designed to work asynchronous environment
mongoose supports both promises and callbacks 

*/

const Books = [{
 ISBN: 12345,
 title: "BookOne",
 authors: [1],
 lang: "english",
 publicationdate: "2012-5-3",
 numPages: 250,
 category: ["ggg", 'fiction'],
 publication: 1,

},
{
 ISBN: 23456,
 title: "BookTwo",
 authors: [1, 2],
 lang: "english",
 publicationdate: '2015-4-5',
 numPages: 350,
 category: ["devops", 'fiction'],
 publication: 1,

}]
const Authors = [{
 id: 1,
 name: "Author1",
 Books: [12345]
},
{
 id: 2,
 name: "Author2",
 Books: [23456, 12345]
}]
const Publications = [{
 id: 1,
 name: "Publication1",
 Books: [12345]
}]

module.exports = { Books, Authors, Publications }