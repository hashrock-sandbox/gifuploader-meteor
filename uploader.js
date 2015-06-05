var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
 stores: [imageStore]
});
if (Meteor.isClient) {
  Template.main.helpers({
    images: function () {
      return Images.find({}, {sort: {uploadedAt: -1}});
    }
  });
  Template.image.events({
    "click .removeImage": function(){
      Images.remove(this._id);
    }
  });
  Template.main.events({
    'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
          }
          // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        });
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
