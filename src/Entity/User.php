<?php

namespace App\Entity;

use App\Enum\AppDesignEnum;
use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableEntity;

    const DEFAULT_IMG_PATH = 'uploads/user/';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string|null The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 128)]
    private ?string $firstName = null;

    #[ORM\Column(length: 128)]
    private ?string $lastName = null;

    private ?string $plainPassword = null;

    #[ORM\Column(length: 128, nullable: true)]
    private ?string $avatar = null;

    #[ORM\Column(nullable: true)]
    private ?bool $active = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthDate = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Currency $currency = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $degree = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    private ?int $monthlyHours = null;

    #[ORM\Column(nullable: true)]
    private ?int $holidayHours = null;

    #[ORM\Column(nullable: true)]
    private ?float $hourlyWage = null;

    #[ORM\Column(length: 11, nullable: true)]
    private ?string $lang = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $workSince = null;

    #[ORM\Column(enumType: AppDesignEnum::class)]
    private ?AppDesignEnum $appDesign = AppDesignEnum::AUTO;

    #[ORM\Column(nullable: true)]
    private ?bool $appSidebarSpread = false;

    #[ORM\Column(enumType: AppDesignEnum::class)]
    private ?AppDesignEnum $appSidebarType = AppDesignEnum::AUTO;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Address $address = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
         $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getName(): ?string
    {
        return sprintf('%s %s %s',$this->degree, $this->firstName, $this->lastName);
    }

    public function getPlainPassword(): string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): static
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAvatarPath(): ?string
    {
        if (!empty($this->avatar)) {
            if (file_exists(sprintf("%s%s", self::DEFAULT_IMG_PATH, $this->avatar))) {
                return sprintf("%s%s", self::DEFAULT_IMG_PATH, $this->avatar);
            }
        }

        return 'build/images/user/empty.png';
    }

    public function getEmptyImagePath(): ?string
    {
        return 'build/images/user/empty.png';
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(?bool $active): static
    {
        $this->active = $active;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTimeInterface $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
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

    public function getDegree(): ?string
    {
        return $this->degree;
    }

    public function setDegree(?string $degree): static
    {
        $this->degree = $degree;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMonthlyHours(): ?int
    {
        return $this->monthlyHours;
    }

    public function setMonthlyHours(?int $monthlyHours): static
    {
        $this->monthlyHours = $monthlyHours;

        return $this;
    }

    public function getHolidayHours(): ?int
    {
        return $this->holidayHours;
    }

    public function setHolidayHours(int $holidayHours): static
    {
        $this->holidayHours = $holidayHours;

        return $this;
    }

    public function getHourlyWage(): ?float
    {
        return $this->hourlyWage;
    }

    public function setHourlyWage(?float $hourlyWage): static
    {
        $this->hourlyWage = $hourlyWage;

        return $this;
    }

    public function getLang(): ?string
    {
        return $this->lang;
    }

    public function setLang(?string $lang): static
    {
        $this->lang = $lang;

        return $this;
    }

    public function getWorkSince(): ?\DateTimeInterface
    {
        return $this->workSince;
    }

    public function setWorkSince(?\DateTimeInterface $workSince): static
    {
        $this->workSince = $workSince;

        return $this;
    }

    public function getAppDesign(): ?AppDesignEnum
    {
        return $this->appDesign;
    }

    public function setAppDesign(AppDesignEnum $appDesign): static
    {
        $this->appDesign = $appDesign;

        return $this;
    }

    public function isAppSidebarSpread(): ?bool
    {
        return $this->appSidebarSpread;
    }

    public function setAppSidebarSpread(?bool $appSidebarSpread): static
    {
        $this->appSidebarSpread = $appSidebarSpread;

        return $this;
    }

    public function getAppSidebarClass(): string
    {
        return match ($this->appSidebarType) {
            AppDesignEnum::AUTO => 'transparent',
            AppDesignEnum::DARK => 'gradient-dark',
            AppDesignEnum::LIGHT => 'white',
            default => $this->appSidebarType->value,
        };
    }

    public function getAppSidebarType(): ?AppDesignEnum
    {
        return $this->appSidebarType;
    }

    public function isAppSidebarTypeActive($type): bool
    {
        return $type === $this->appSidebarType->value;
    }

    public function setAppSidebarType(AppDesignEnum $appSidebarType): static
    {
        $this->appSidebarType = $appSidebarType;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(Address $address): static
    {
        // set the owning side of the relation if necessary
        if ($address->getUser() !== $this) {
            $address->setUser($this);
        }

        $this->address = $address;

        return $this;
    }
}