<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240909212913 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE country (id INT AUTO_INCREMENT NOT NULL, currency_id INT NOT NULL, iso VARCHAR(11) NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_5373C96638248176 (currency_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE currency (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(32) NOT NULL, iso VARCHAR(16) NOT NULL, symbol VARCHAR(16) DEFAULT NULL, decimal_separator VARCHAR(1) DEFAULT NULL, decimals SMALLINT DEFAULT NULL, symbol_position VARCHAR(16) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE public_holiday (id INT AUTO_INCREMENT NOT NULL, country_id INT NOT NULL, name VARCHAR(255) NOT NULL, date DATE NOT NULL, billable TINYINT(1) DEFAULT NULL, INDEX IDX_8744ED86F92F3E70 (country_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, currency_id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(128) NOT NULL, last_name VARCHAR(128) NOT NULL, avatar VARCHAR(128) DEFAULT NULL, active TINYINT(1) DEFAULT NULL, birth_date DATE DEFAULT NULL, degree VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, monthly_hours INT DEFAULT NULL, holiday_hours INT DEFAULT NULL, hourly_wage DOUBLE PRECISION DEFAULT NULL, lang VARCHAR(11) DEFAULT NULL, work_since DATE DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_8D93D64938248176 (currency_id), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE country ADD CONSTRAINT FK_5373C96638248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE public_holiday ADD CONSTRAINT FK_8744ED86F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64938248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE country DROP FOREIGN KEY FK_5373C96638248176');
        $this->addSql('ALTER TABLE public_holiday DROP FOREIGN KEY FK_8744ED86F92F3E70');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64938248176');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE currency');
        $this->addSql('DROP TABLE public_holiday');
        $this->addSql('DROP TABLE user');
    }
}
