package br.com.alura.screenmatch.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@Entity
@Table(name = "episodes")
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private Integer season;
    private String title;
    private Integer episode;
    private Double rating;
    private LocalDate releaseDate;
    @ManyToOne
    private Serie serie;

    public Episode() {
    }

    public Episode(Integer season, EpisodesData episodesData) {
        this.season = season;
        this.title = episodesData.title();
        this.episode = episodesData.episode();

        try {
            this.rating = Double.valueOf(episodesData.rating());
        } catch (NumberFormatException e) {
            this.rating = 0.0;
        }

        try {
            this.releaseDate = LocalDate.parse(episodesData.releaseDate());
        } catch (DateTimeParseException ex) {
            this.releaseDate = null;
        }
    }

    public Serie getSerie() {
        return serie;
    }

    public void setSerie(Serie serie) {
        this.serie = serie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getEpisode() {
        return episode;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    @Override
    public String toString() {
        return "season=" + season +
               ", title='" + title + '\'' +
               ", episode=" + episode +
               ", rating=" + rating +
               ", releaseDate=" + releaseDate;
    }
}
