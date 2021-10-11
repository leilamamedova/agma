// Ckeditor
ClassicEditor
  .create( document.querySelector( '#editor' ) )
  .then( editor => {
    console.log( 'successful' );
  })
  .catch( error => {
    console.error( 'faile' );
  });


  