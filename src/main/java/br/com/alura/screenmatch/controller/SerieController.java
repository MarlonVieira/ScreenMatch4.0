package br.com.alura.screenmatch.controller;

import br.com.alura.screenmatch.dto.EpisodeDTO;
import br.com.alura.screenmatch.dto.SerieDTO;
import br.com.alura.screenmatch.model.Episode;
import br.com.alura.screenmatch.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/series")
public class SerieController {

    @Autowired
    private SerieService service;

    @GetMapping()
    public List<SerieDTO> getSeries() {
        return service.getAllSeries();
    }

    @GetMapping("/top5")
    public  List<SerieDTO> getTop5(){
        return service.getTop5Series();
    }

    @GetMapping("/release")
    public List<SerieDTO> getRelease() {
        return service.getRelease();
    }

    @GetMapping("/{id}")
    public SerieDTO getById(@PathVariable Long id) {
        return service.getByID(id);
    }

    @GetMapping("/{id}/seasons/all")
    public List<EpisodeDTO> getAllSeasons(@PathVariable Long id) {
        return service.getAllSeasons(id);
    }

    @GetMapping("/{id}/seasons/{number}")
    public List<EpisodeDTO> getSeasonsByNumber(@PathVariable Long id, @PathVariable Long number) {
        return service.getSeasonsByNumber(id, number);
    }

    @GetMapping("/category/{genre}")
    public List<SerieDTO> getSerieByCategory(@PathVariable String genre) {
        return service.getSerieByCategory(genre);
    }
}