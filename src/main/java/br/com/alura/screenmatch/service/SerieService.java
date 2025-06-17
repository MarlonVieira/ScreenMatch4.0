package br.com.alura.screenmatch.service;

import br.com.alura.screenmatch.dto.SerieDTO;
import br.com.alura.screenmatch.model.Serie;
import br.com.alura.screenmatch.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SerieService {
    @Autowired
    private SerieRepository repository;

    public List<SerieDTO> getAllSeries() {
        return convertData(repository.findAll());
    }

    public List<SerieDTO> getTop5Series() {
        return convertData(repository.findTop5ByOrderByRatingDesc());
    }

    private List<SerieDTO> convertData(List<Serie> series) {
        return series.stream()
                .map(s -> new SerieDTO(s.getId(), s.getTitle(), s.getTotalSeasons(), s.getRating(), s.getYear(), s.getGenre(), s.getActors(), s.getPoster(), s.getSynopsis()))
                .collect(Collectors.toList());
    }

    public List<SerieDTO> getRelease() {
        return convertData(repository.findTop5ByOrderByEpisodeListReleaseDateDesc());
    }
}
