package quizarena;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {

    List<GameResult> findTop10ByOrderByScoreDesc();
}
