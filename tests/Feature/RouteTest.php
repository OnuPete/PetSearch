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

    public function testGetDog()
    {
        $this->get('/api/search/dogs?breed=aire')
          ->assertStatus(200)
          ->assertJsonFragment(['breed' => 'Airedale']);

        $this->get('/api/search/dogs?breed=aired c')
          ->assertStatus(200)
          ->assertJsonFragment(['breed' => 'Long Haired Chihuahua']);

        $this->get('/api/search/dogs?breed=Great Dane')
          ->assertStatus(200)
          ->assertJsonStructure([]);

        $this->get('/api/search/dogs?breed=ared')
          ->assertStatus(200)
          ->assertJsonStructure([]);
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

      $this
          ->json('POST', '/api/dogs', ['breed' => 'airedale'])
          ->assertJsonFragment(['breed' => 'Airedale']);
    }
}
