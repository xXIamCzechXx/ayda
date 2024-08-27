<?php

namespace App\Factory;

use App\Entity\Currency;
use App\Repository\CurrencyRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Currency>
 *
 * @method        Currency|Proxy                     create(array|callable $attributes = [])
 * @method static Currency|Proxy                     createOne(array $attributes = [])
 * @method static Currency|Proxy                     find(object|array|mixed $criteria)
 * @method static Currency|Proxy                     findOrCreate(array $attributes)
 * @method static Currency|Proxy                     first(string $sortedField = 'id')
 * @method static Currency|Proxy                     last(string $sortedField = 'id')
 * @method static Currency|Proxy                     random(array $attributes = [])
 * @method static Currency|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CurrencyRepository|RepositoryProxy repository()
 * @method static Currency[]|Proxy[]                 all()
 * @method static Currency[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Currency[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Currency[]|Proxy[]                 findBy(array $attributes)
 * @method static Currency[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Currency[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CurrencyFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'iso' => 'CZK',
            'name' => 'Test',
            'decimals' => 2,
            'symbol' => 'Kč',
            'decimalSeparator' => ',',
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Currency $currency): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Currency::class;
    }
}
