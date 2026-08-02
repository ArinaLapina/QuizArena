package quizarena;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class GameResultControllerTest {

    @Test
    void getResultsReturnsResults() {
        GameResultRepository gameResultRepository = Mockito.mock(GameResultRepository.class);

        List<GameResult> gameResults = List.of(
                new GameResult("Arina", 10),
                new GameResult("Tom", 8)
        );

        Mockito.when(gameResultRepository.findTop10ByOrderByScoreDesc()).thenReturn(gameResults);

        GameResultController gameResultController = new GameResultController(gameResultRepository);

        List<GameResult> result = gameResultController.getResults();

        assertEquals(2, result.size());
        assertEquals("Arina", result.get(0).getPlayerName());
        assertEquals(10, result.get(0).getScore());
    }

    @Test
    void saveResultSavesCorrectData() {
        GameResultRepository gameResultRepository = Mockito.mock(GameResultRepository.class);

        GameResult gameResult = new GameResult("Arina", 9);

        Mockito.when(gameResultRepository.save(gameResult)).thenReturn(gameResult);

        GameResultController gameResultController = new GameResultController(gameResultRepository);

        Object result = gameResultController.saveResult(gameResult).getBody();

        GameResult savedResult = (GameResult) result;

        assertEquals("Arina", savedResult.getPlayerName());
        assertEquals(9, savedResult.getScore());
    }
}