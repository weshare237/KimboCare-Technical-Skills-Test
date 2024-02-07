<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "txHash" => $this->faker->sha256,
            "fromAddress" => $this->faker->unique()->bothify('??????????????????????????????????????'),
            "toAddress" => $this->faker->unique()->bothify('????????????????????????????????????????'),
            "amount" => $this->faker->randomFloat(2,  1,  100), // Assuming amount is a float with  2 decimal places
            "txTimestamp" => $this->faker->dateTime, // Generates a DateTime object
        ];
    }
}
