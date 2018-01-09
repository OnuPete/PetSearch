<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pet Search</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
        <style>
            .position-ref {
                position: relative;
            }

            .content {
                text-align: center;
                color: #FEFEFE;
            }

        </style>
    </head>
    <body>
      <h2 class="position-ref content">Doggy Search</h2>
      <div id="root"></div>
      <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>
