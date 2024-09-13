<?php

namespace App\Entity;

use App\Repository\CountryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CountryRepository::class)]
class Country
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Currency $currency = null;

    #[ORM\Column(length: 11)]
    private ?string $iso = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, PublicHoliday>
     */
    #[ORM\OneToMany(targetEntity: PublicHoliday::class, mappedBy: 'Country', cascade: ['persist'], orphanRemoval: true)]
    private Collection $publicHolidays;

    public function __construct()
    {
        $this->publicHolidays = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCurrency(): ?Currency
    {
        return $this->currency;
    }

    public function setCurrency(?Currency $currency): static
    {
        $this->currency = $currency;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, PublicHoliday>
     */
    public function getPublicHolidays(): Collection
    {
        return $this->publicHolidays;
    }

    public function addPublicHoliday(PublicHoliday $publicHoliday): static
    {
        if (!$this->publicHolidays->contains($publicHoliday)) {
            $this->publicHolidays->add($publicHoliday);
            $publicHoliday->setCountry($this);
        }

        return $this;
    }

    public function removePublicHoliday(PublicHoliday $publicHoliday): static
    {
        if ($this->publicHolidays->removeElement($publicHoliday)) {
            // set the owning side to null (unless already changed)
            if ($publicHoliday->getCountry() === $this) {
                $publicHoliday->setCountry(null);
            }
        }

        return $this;
    }
}