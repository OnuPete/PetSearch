<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dogs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('breed')->unique();
            $table->timestamps();
        });

        $csv = resource_path()."/assets/sql/dog-breeds.csv";

        $query = sprintf("LOAD DATA LOCAL INFILE '%s' INTO TABLE `dogs` FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' ESCAPED BY '\"' LINES TERMINATED BY '\\n' IGNORE 0 LINES (`breed`)", addslashes($csv));

        $pdo = DB::connection()->getpdo();

        $pdo->exec($query);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dogs');
    }
}
