<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Dog;

class RouteTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetDogs()
    {
        $response = $this->get('/api/dogs');

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                '*' => [
                  'id', 'breed', 'created_at', 'updated_at'
                ]
            ]);
    }

    public function testGetDog()
    {
        $this->get('/api/dogs/aire')
          ->assertStatus(200)
          ->assertJsonFragment(['breed' => 'Airedale']);

        $this->get('/api/dogs/aired c')
          ->assertStatus(200)
          ->assertJsonFragment(['breed' => 'Long Haired Chihuahua']);
    }

    public function testPostDog()
    {
      $this
          ->json('POST', '/api/dogs', ['breed' => 'Great Dane'])
          ->assertJson([
              'breed' => 'Great Dane',
          ]);


      $this
          ->json('POST', '/api/dogs', ['breed' => 'Gr8 Dane'])
          ->assertJsonFragment([
              'message' => 'The given data was invalid.',
          ]);
    }
}
