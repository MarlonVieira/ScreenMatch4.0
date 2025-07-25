package br.com.alura.screenmatch.dto;

import br.com.alura.screenmatch.model.Category;

public record SerieDTO(Long id,
                       String title,
                       Integer totalSeasons,
                       Double rating,
                       String year,
                       Category genre,
                       String actors,
                       String poster,
                       String synopsis) {
}
