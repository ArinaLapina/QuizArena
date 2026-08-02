package quizarena;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/results")
public class GameResultController {

    private final GameResultRepository gameResultRepository;
    private final int maxScore = 12;

    public GameResultController(GameResultRepository gameResultRepository) {
        this.gameResultRepository = gameResultRepository;
    }

    @GetMapping
    public List<GameResult> getResults() {
        return gameResultRepository.findTop10ByOrderByScoreDesc();
    }

    @PostMapping
    public ResponseEntity<?> saveResult(@RequestBody GameResult gameResult) {
        if (gameResult.getPlayerName() == null || gameResult.getPlayerName().trim().isEmpty()) return ResponseEntity.badRequest().body("Please enter your name");
        if (gameResult.getPlayerName().trim().length() > 30) return ResponseEntity.badRequest().body("Name is too long");
        if (gameResult.getScore() < 0 || gameResult.getScore() > maxScore) return ResponseEntity.badRequest().body("Score is not valid");

        gameResult.setPlayerName(gameResult.getPlayerName().trim());
        return ResponseEntity.ok(gameResultRepository.save(gameResult));
    }
}
