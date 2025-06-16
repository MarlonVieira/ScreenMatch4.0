package br.com.alura.screenmatch.controller;

import br.com.alura.screenmatch.dto.SerieDTO;
import br.com.alura.screenmatch.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class SerieController {
    @Autowired
    private SerieRepository repository;

    @GetMapping("/series")
    public List<SerieDTO> getSeries() {
        return repository.findAll()
                .stream()
                .map(s -> new SerieDTO(s.getId(), s.getTitle(), s.getTotalSeasons(), s.getRating(), s.getYear(), s.getGenre(), s.getActors(), s.getPoster(), s.getSynopsis()))
                .collect(Collectors.toList());
    }
}