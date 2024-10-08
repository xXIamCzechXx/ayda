<?php

namespace App\Entity;

use App\Repository\CurrencyRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: CurrencyRepository::class)]
class Currency
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 32)]
    private ?string $name = null;

    #[ORM\Column(length: 16)]
    private ?string $iso = null;

    #[ORM\Column(length: 16, nullable: true)]
    private ?string $symbol = null;

    #[ORM\Column(length: 1, nullable: true)]
    private ?string $decimalSeparator = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $decimals = null;

    #[ORM\Column(length: 16, nullable: true)]
    private ?string $symbolPosition = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIso(): ?string
    {
        return $this->iso;
    }

    public function setIso(string $iso): static
    {
        $this->iso = $iso;

        return $this;
    }

    public function getSymbol(): ?string
    {
        return $this->symbol;
    }

    public function setSymbol(?string $symbol): static
    {
        $this->symbol = $symbol;

        return $this;
    }

    public function getDecimalSeparator(): ?string
    {
        return $this->decimalSeparator;
    }

    public function setDecimalSeparator(?string $decimalSeparator): static
    {
        $this->decimalSeparator = $decimalSeparator;

        return $this;
    }

    public function getDecimals(): ?int
    {
        return $this->decimals;
    }

    public function setDecimals(?int $decimals): static
    {
        $this->decimals = $decimals;

        return $this;
    }

    public function getSymbolPosition(): ?string
    {
        return $this->symbolPosition;
    }

    public function setSymbolPosition(?string $symbolPosition): static
    {
        $this->symbolPosition = $symbolPosition;

        return $this;
    }

    public function __toString(): string
    {
        return sprintf(
            '%s (%s) %s',
            $this->name,
            $this->iso,
            $this->symbol !== null ? $this->symbol: ''
        );
    }
}