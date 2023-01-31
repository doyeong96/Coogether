package coogether.backend.controller;

import coogether.backend.domain.IngredientList;
import coogether.backend.domain.MyIngredientManage;
import coogether.backend.domain.status.EnumIngredientCategory;
import coogether.backend.dto.IngredientListDto;
import coogether.backend.dto.MyIngredientManageDto;
import coogether.backend.dto.UserUpdateDto;
import coogether.backend.dto.request.MyIngredientManageRequest;
import coogether.backend.dto.simple.SimpleMyIngredientManageDto;
import coogether.backend.service.MyIngredientManageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(tags = {"내 냉장고 관리를 제공하는 Controller"})
@RestController
@RequiredArgsConstructor
public class MyIngredientManageController {
    private final MyIngredientManageService myIngredientManageService;

    @ApiOperation(value = "------------ PATCH로 통합 ------------")
    @PostMapping("/myIngredient/create/{userSeq}/{ingredientId}")
    public ResponseEntity addMyIngredientByIngredientId(@PathVariable("userSeq") Long userSeq, @PathVariable("ingredientId") int ingredientId) {

        MyIngredientManage result = myIngredientManageService.addMyIngredientByIngredientId(userSeq,ingredientId);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SimpleMyIngredientManageDto(result));
    }

    @ApiOperation(value = "내 냉장고에 재료 추가하는 메소드 (최초등록/재등록/제거) * flag : {IN, OUT}")
    @PatchMapping("/myIngredient/update/{userSeq}/{ingredientId}")
    public ResponseEntity updateMyIngredientByIngredientId(@PathVariable("userSeq") Long userSeq, @PathVariable("ingredientId") int ingredientId) {

        MyIngredientManage result = myIngredientManageService.updateMyIngredientByIngredientId(userSeq,ingredientId);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "내 냉장고에 있는 전체 재료 목록을 반환하는 메소드")
    @GetMapping("/myIngredient/list/total/{userSeq}")
    public ResponseEntity myIngredientTotalListByUserSeq(@PathVariable("userSeq") Long userSeq)  {
        List<MyIngredientManageDto> result = new ArrayList<>();
        List<MyIngredientManage> myIngredientManages = myIngredientManageService.myIngredientTotalListByUserSeq(userSeq);
        for (MyIngredientManage mm : myIngredientManages)
            result.add(new MyIngredientManageDto(mm));

        return ResponseEntity.ok().body(result);
    }

}