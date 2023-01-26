package coogether.backend.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import coogether.backend.domain.status.EnumCookingRoomStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "cooking_room")
public class CookingRoom {

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "cooking_room_host_id")
    private User cookingRoomHostId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipeId;

    @OneToMany(mappedBy = "cookingRoomId", cascade = CascadeType.ALL)
    private List<CookingRoomHistory> cookingRoomHistoryList = new ArrayList<>();

    @Id
    @GeneratedValue
    @Column(name = "cooking_room_id", nullable = false)
    private int cookingRoomId;

    @Column(name = "cooking_room_name", length = 30, nullable = false)
    private String cookingRoomName;

    @Column(name = "cooking_room_img", length = 100, nullable = false)
    private String cookingRoomImg;


    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    @LastModifiedDate // 요리 시작 시간
    @Column(name = "cooking_room_start_time", updatable = false, nullable = false)
    private LocalDateTime cookingRoomStartTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooking_room_status", nullable = false)
    private EnumCookingRoomStatus cookingRoomStatus;

    @Column(name = "cooking_room_notice", length = 200, nullable = false)
    private String cookingRoomNotice;
}