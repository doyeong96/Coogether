package coogether.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import coogether.backend.domain.status.EnumIngredientCategory;
import coogether.backend.domain.status.EnumRecipeCategory;
import coogether.backend.domain.status.EnumRecipeType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor//(access = AccessLevel.PROTECTED)
@Table(name = "recipe")
public class Recipe {

    @JsonIgnore
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientList> ingredientList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CookingRoom> cookingRoomList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeStep> recipeStepList = new ArrayList<>();

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_seq")
    private User user;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id", nullable = false)
    private Long recipeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "recipe_category", nullable = false)
    private EnumRecipeCategory recipeCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "recipe_type", nullable = false)
    private EnumRecipeType recipeType;

    @Column(name = "recipe_content", length = 2000, nullable = false)
    private String recipeContent;

    @Column(name = "recipe_name", length = 50, nullable = false)
    private String recipeName;

    @CreatedDate // 최초 생성 시간
    @Column(name = "recipe_created_date", updatable = false)
    private LocalDateTime recipeCreatedDate;

    @Column(name = "recipe_img", length = 1000, nullable = true)
    private String recipeImg;
}
