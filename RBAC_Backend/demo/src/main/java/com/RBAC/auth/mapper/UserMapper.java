package com.RBAC.auth.mapper;

import com.RBAC.auth.dto.UserRequest;
import com.RBAC.auth.dto.UserResponse;
import com.RBAC.auth.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toEntity(UserRequest request);

    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
            ignoreByDefault = false
    )
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    void updateUserFromDto(UserRequest request, @MappingTarget User user);
}